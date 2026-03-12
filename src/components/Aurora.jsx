import { Renderer, Program, Mesh, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

import './Aurora.css';

const hexToRgbArray = (hex) => {
  let h = hex.trim();
  if (h.startsWith('#')) h = h.slice(1);
  if (h.length === 3) {
    h = h.split('').map((c) => c + c).join('');
  }
  const intVal = parseInt(h, 16);
  if (Number.isNaN(intVal)) {
    return [1, 1, 1];
  }
  const r = (intVal >> 16) & 255;
  const g = (intVal >> 8) & 255;
  const b = intVal & 255;
  return [r / 255, g / 255, b / 255];
};

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  // simple horizontal gradient between first two colors
  vec3 base = mix(uColorStops[0], uColorStops[1], smoothstep(0.0, 1.0, uv.x));
  // vertical blend towards third color
  float vBlend = smoothstep(0.3 - uBlend, 0.8 + uBlend, uv.y);
  vec3 col = mix(base, uColorStops[2], vBlend);

  // soft wave mask so it feels like an aurora band
  float wave = sin(uv.x * 6.2831 + uTime * 0.2) * 0.15 * uAmplitude;
  float mask = smoothstep(0.0, 0.4, uv.y + wave) * (1.0 - smoothstep(0.4, 1.0, uv.y + wave));

  float alpha = mask * 0.8;
  gl_FragColor = vec4(col * alpha, alpha);
}
`;

export default function Aurora(props) {
  const { colorStops = ['#5227FF', '#7cff67', '#5227FF'], amplitude = 1.0, blend = 0.5 } = props;
  const propsRef = useRef(props);
  propsRef.current = props;

  const ctnDom = useRef(null);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    Object.assign(gl.canvas.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      display: 'block',
      backgroundColor: 'transparent',
    });

    let program;

    let resizeObserver;

    function resize() {
      if (!ctn) return;
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    }
    window.addEventListener('resize', resize);
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(ctn);
    }

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      // eslint-disable-next-line no-param-reassign
      delete geometry.attributes.uv;
    }

    const colorStopsArray = colorStops.map((hex) => hexToRgbArray(hex));

    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: colorStopsArray },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: blend },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    let animateId = 0;
    const update = (t) => {
      animateId = requestAnimationFrame(update);
      const { time = t * 0.01, speed = 1.0 } = propsRef.current;
      program.uniforms.uTime.value = time * speed * 0.1;
      program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? 1.0;
      program.uniforms.uBlend.value = propsRef.current.blend ?? blend;
      const stops = propsRef.current.colorStops ?? colorStops;
      program.uniforms.uColorStops.value = stops.map((hex) => hexToRgbArray(hex));
      renderer.render({ scene: mesh });
    };
    animateId = requestAnimationFrame(update);

    resize();

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      if (resizeObserver) resizeObserver.disconnect();
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amplitude]);

  return <div ref={ctnDom} className="aurora-container" />;
}
