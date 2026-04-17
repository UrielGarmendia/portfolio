/**
 * ProjectCard.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * 3D flip card with two faces:
 *
 *  FRONT — UI face:
 *   • Project screenshot / gradient placeholder
 *   • Tech stack badges
 *   • Repo + Deploy links
 *   • [ VER ARQUITECTURA ] button → triggers flip
 *
 *  BACK — Engineering face (terminal dark):
 *   • academicChallenge description
 *   • Architecture flow diagram: nodes connected by arrows
 *   • dataFlow one-liner in monospace
 *   • [ VOLVER A UI ] button → flips back
 *
 * 3D technique:
 *   Both faces share the same fixed dimensions inside a `transform-style: preserve-3d`
 *   container. Front face: `rotateY(0)`, Back face: `rotateY(180deg)`.
 *   When `isFlipped`, the container animates to `rotateY(180deg)`.
 *   `backface-visibility: hidden` hides the reverse of each panel.
 *
 * Debug mode:
 *   Exposes `data-debug` attr on the card; DesktopGrid scanner can inspect it.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSystemStore from '../../store/useSystemStore';

// ── Node type colors ──────────────────────────────────────────────────────────
const NODE_COLORS = {
  client:  { border: '#61dafb', text: '#61dafb', bg: 'rgba(97,218,251,0.06)' },
  api:     { border: '#4ade80', text: '#4ade80', bg: 'rgba(74,222,128,0.06)' },
  service: { border: '#f59e0b', text: '#f59e0b', bg: 'rgba(245,158,11,0.06)' },
  db:      { border: '#FF007F', text: '#FF007F', bg: 'rgba(255,0,127,0.06)'  },
};

// ── Card dimensions ───────────────────────────────────────────────────────────
const CARD_WIDTH  = '300px';
const CARD_HEIGHT = '380px';

// ── Component ─────────────────────────────────────────────────────────────────

const ProjectCard = ({ project, index = 0 }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isDebugActive = useSystemStore((s) => s.isDebugActive);

  return (
    <div
      data-debug={isDebugActive ? `id="${project.id}" face="${isFlipped ? 'back' : 'front'}" status="rendered"` : undefined}
      style={{
        width:       CARD_WIDTH,
        height:      CARD_HEIGHT,
        perspective: '1200px',
        flexShrink:  0,
        position:    'relative',
      }}
    >
      {/* ── Debug badge ─────────────────────────────────────────────────── */}
      {isDebugActive && (
        <div style={{
          position:      'absolute',
          top:           '-18px',
          left:           0,
          fontFamily:    '"JetBrains Mono", monospace',
          fontSize:      '8px',
          color:         '#FF007F',
          background:    'rgba(0,0,0,0.85)',
          padding:       '1px 5px',
          border:        '1px dashed #FF007F',
          whiteSpace:    'nowrap',
          pointerEvents: 'none',
          zIndex:         10,
        }}>
          {`<ProjectCard id="${project.id}" face="${isFlipped ? 'arch' : 'ui'}" />`}
        </div>
      )}

      {/* ── Flip container ──────────────────────────────────────────────── */}
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width:           '100%',
          height:          '100%',
          position:        'relative',
          transformStyle:  'preserve-3d',
        }}
      >
        {/* ══ FRONT FACE ══════════════════════════════════════════════════ */}
        <CardFace style={{ backfaceVisibility: 'hidden' }}>
          <FrontFace project={project} onFlip={() => setIsFlipped(true)} />
        </CardFace>

        {/* ══ BACK FACE ═══════════════════════════════════════════════════ */}
        <CardFace style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <BackFace project={project} onFlip={() => setIsFlipped(false)} />
        </CardFace>
      </motion.div>
    </div>
  );
};


// ── CardFace wrapper ──────────────────────────────────────────────────────────

const CardFace = ({ children, style = {} }) => (
  <div
    style={{
      position:  'absolute',
      inset:      0,
      overflow:  'hidden',
      border:    '1px solid rgba(255,255,255,0.07)',
      background: '#1A1A1A',
      ...style,
    }}
  >
    {children}
  </div>
);


// ═══════════════════════════════════════════════════════════════════════════════
// FRONT FACE — UI preview
// ═══════════════════════════════════════════════════════════════════════════════

const FrontFace = ({ project, onFlip }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* ── Screenshot / placeholder ──────────────────────────────────── */}
      <div style={{
        height:     '150px',
        flexShrink:  0,
        overflow:   'hidden',
        position:   'relative',
        background: '#111',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        {!imgError ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            onError={() => setImgError(true)}
            style={{
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              objectPosition: 'top',
              display:    'block',
            }}
          />
        ) : (
          /* Fallback gradient when image fails */
          <GradientPlaceholder title={project.title} />
        )}

        {/* Scanline overlay */}
        <div style={{
          position:   'absolute',
          inset:       0,
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 3px)',
          pointerEvents: 'none',
        }} />

        {/* Top-left accent */}
        <div style={{
          position:   'absolute',
          top:         0,
          left:        0,
          width:      '40%',
          height:     '2px',
          background: 'linear-gradient(90deg, #FF007F, transparent)',
        }} />
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>

        {/* Tech badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} style={{
              fontFamily:    '"JetBrains Mono", monospace',
              fontSize:      '8px',
              color:         '#505050',
              border:        '1px solid rgba(255,255,255,0.07)',
              padding:       '1px 5px',
              letterSpacing: '0.04em',
            }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily:    '"Inter", sans-serif',
          fontSize:      '13px',
          fontWeight:    700,
          color:         '#F3F4F6',
          margin:         0,
          letterSpacing: '-0.01em',
          lineHeight:    1.3,
        }}>
          {project.title}
        </h3>

        {/* Role */}
        <p style={{
          fontFamily:    '"JetBrains Mono", monospace',
          fontSize:      '9px',
          color:         'rgba(255,0,127,0.6)',
          margin:         0,
          letterSpacing: '0.06em',
        }}>
          {project.role}
        </p>

        {/* Description */}
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize:   '11px',
          color:      '#6B7280',
          margin:      0,
          lineHeight:  1.5,
          flex:        1,
          overflow:   'hidden',
          display:    '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}>
          {project.simpleDesc}
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '6px', marginTop: 'auto', paddingTop: '6px' }}>
          <ActionLink href={project.deployUrl} label="DEPLOY →" primary />
          <ActionLink href={project.repoUrl}   label="REPO"     primary={false} />
          <button
            onClick={onFlip}
            style={{
              marginLeft:    'auto',
              fontFamily:    '"JetBrains Mono", monospace',
              fontSize:      '8px',
              letterSpacing: '0.08em',
              padding:       '4px 8px',
              background:    'rgba(255,0,127,0.12)',
              border:        '1px solid rgba(255,0,127,0.45)',
              color:         '#FF007F',
              cursor:        'pointer',
              whiteSpace:    'nowrap',
              transition:    'all 0.12s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,0,127,0.22)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,0,127,0.12)'; }}
          >
            [ VER ARQUITECTURA ]
          </button>
        </div>
      </div>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════════════════════
// BACK FACE — Engineering / Architecture view
// ═══════════════════════════════════════════════════════════════════════════════

const BackFace = ({ project, onFlip }) => (
  <div style={{
    display:       'flex',
    flexDirection: 'column',
    height:        '100%',
    background:    '#0D0D0D',
    padding:       '14px',
  }}>

    {/* Header */}
    <div style={{ marginBottom: '12px' }}>
      <p style={{
        fontFamily:    '"JetBrains Mono", monospace',
        fontSize:      '9px',
        color:         '#FF007F',
        letterSpacing: '0.15em',
        margin:        '0 0 4px 0',
        opacity:       0.8,
      }}>
        // ARCHITECTURE VIEW
      </p>
      <p style={{
        fontFamily:    '"Inter", sans-serif',
        fontSize:      '11px',
        fontWeight:    600,
        color:         '#F3F4F6',
        margin:         0,
        lineHeight:    1.3,
      }}>
        {project.title}
      </p>
    </div>

    {/* Academic challenge */}
    <div style={{
      background:    'rgba(255,0,127,0.04)',
      border:        '1px solid rgba(255,0,127,0.15)',
      padding:       '8px 10px',
      marginBottom:  '12px',
    }}>
      <p style={{
        fontFamily:    '"JetBrains Mono", monospace',
        fontSize:      '8px',
        color:         '#555',
        letterSpacing: '0.1em',
        margin:        '0 0 4px 0',
      }}>
        CHALLENGE
      </p>
      <p style={{
        fontFamily: '"Inter", sans-serif',
        fontSize:   '10px',
        color:      '#9CA3AF',
        margin:      0,
        lineHeight:  1.5,
        overflow:   'hidden',
        display:    '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
      }}>
        {project.academicChallenge}
      </p>
    </div>

    {/* Architecture flow diagram */}
    <div style={{ flex: 1 }}>
      <p style={{
        fontFamily:    '"JetBrains Mono", monospace',
        fontSize:      '8px',
        color:         '#333',
        letterSpacing: '0.14em',
        margin:        '0 0 8px 0',
      }}>
        DATA FLOW
      </p>
      <ArchDiagram nodes={project.architecture} />
    </div>

    {/* Data flow one-liner */}
    {project.dataFlow && (
      <pre style={{
        fontFamily:   '"JetBrains Mono", monospace',
        fontSize:     '7.5px',
        color:        '#2a2a2a',
        margin:       '8px 0',
        whiteSpace:   'pre-wrap',
        wordBreak:    'break-all',
        lineHeight:   1.5,
      }}>
        {project.dataFlow}
      </pre>
    )}

    {/* Back button */}
    <button
      onClick={onFlip}
      style={{
        width:         '100%',
        fontFamily:    '"JetBrains Mono", monospace',
        fontSize:      '9px',
        letterSpacing: '0.1em',
        padding:       '7px',
        background:    'rgba(255,255,255,0.03)',
        border:        '1px solid rgba(255,255,255,0.08)',
        color:         '#4B5563',
        cursor:        'pointer',
        marginTop:     '4px',
        transition:    'all 0.12s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#9CA3AF'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#4B5563'; }}
    >
      ← VOLVER A UI
    </button>
  </div>
);


// ── Architecture Diagram ──────────────────────────────────────────────────────
// Renders nodes connected by arrows in a vertical flow.

const ArchDiagram = ({ nodes = [] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
    {nodes.map((node, i) => {
      const colors = NODE_COLORS[node.type] ?? NODE_COLORS.service;
      return (
        <div key={i}>
          {/* Node */}
          <div style={{
            display:       'flex',
            alignItems:    'center',
            gap:           '8px',
            padding:       '5px 8px',
            background:     colors.bg,
            border:        `1px solid ${colors.border}22`,
            borderLeft:    `2px solid ${colors.border}`,
          }}>
            <div>
              <div style={{
                fontFamily:    '"JetBrains Mono", monospace',
                fontSize:      '9px',
                color:          colors.text,
                fontWeight:    700,
                lineHeight:    1.2,
              }}>
                {node.label}
              </div>
              <div style={{
                fontFamily:    '"JetBrains Mono", monospace',
                fontSize:      '7.5px',
                color:         '#333',
                letterSpacing: '0.04em',
              }}>
                {node.sublabel}
              </div>
            </div>
          </div>

          {/* Arrow connector (not after last node) */}
          {i < nodes.length - 1 && (
            <div style={{
              display:        'flex',
              alignItems:     'center',
              paddingLeft:    '12px',
              height:         '10px',
            }}>
              <div style={{
                width:      '1px',
                height:     '100%',
                background: 'rgba(255,255,255,0.08)',
                position:   'relative',
              }}>
                <div style={{
                  position:   'absolute',
                  bottom:      0,
                  left:       '-3px',
                  fontSize:   '7px',
                  color:      'rgba(255,255,255,0.12)',
                  lineHeight:  1,
                }}>▼</div>
              </div>
            </div>
          )}
        </div>
      );
    })}
  </div>
);


// ── Gradient Placeholder ───────────────────────────────────────────────────────
// Fallback when image fails to load.

const GradientPlaceholder = ({ title }) => (
  <div style={{
    width:          '100%',
    height:         '100%',
    background:     'linear-gradient(135deg, #1a1a1a 0%, #111 100%)',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
  }}>
    <span style={{
      fontFamily:    '"JetBrains Mono", monospace',
      fontSize:      '10px',
      color:         '#2a2a2a',
      letterSpacing: '0.1em',
      textAlign:     'center',
      padding:       '0 16px',
    }}>
      {title}
    </span>
  </div>
);


// ── ActionLink ────────────────────────────────────────────────────────────────

const ActionLink = ({ href, label, primary }) => {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily:    '"JetBrains Mono", monospace',
        fontSize:      '8px',
        letterSpacing: '0.08em',
        padding:       '4px 8px',
        color:          primary ? '#FF007F' : '#4B5563',
        background:     primary ? 'rgba(255,0,127,0.08)' : 'transparent',
        border:        `1px solid ${primary ? 'rgba(255,0,127,0.3)' : 'rgba(255,255,255,0.06)'}`,
        textDecoration: 'none',
        display:       'inline-block',
        whiteSpace:    'nowrap',
        transition:    'all 0.12s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.75'; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
    >
      {label}
    </a>
  );
};


export default ProjectCard;
