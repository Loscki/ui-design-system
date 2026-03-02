import type { Meta } from '@storybook/react';
import brandTokens from '../../../build/tokens-for-style-dict.json';

const meta: Meta = {
  title: 'Foundations/Colors',
  argTypes: {
    brandBackground: { control: 'color' },
    semanticBackground: { control: 'color' },
    showBrandNames: { control: 'boolean' },
  },
};
export default meta;

interface PaletteProps {
  brandBackground?: string;
  semanticBackground?: string;
  showBrandNames?: boolean;
}

const getContrastColor = (hex: string) => {
  if (!hex) return '#fff';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? '#000' : '#fff';
};

const getColors = () => {
  const brandColors: { name: string; value: string }[] = [];
  const semanticColors: Record<string, { name: string; value: string; brandRef: string }[]> = {};

  const colorData = brandTokens.color;

  if (colorData?.brand) {
    Object.entries(colorData.brand).forEach(([name, obj]: any) => {
      brandColors.push({ name, value: obj.$value?.hex });
    });
  }

  if (colorData?.semantic) {
    Object.entries(colorData.semantic).forEach(([name, obj]: any) => {
      const brandRef = obj.$extensions?.['com.figma.aliasData']?.targetVariableName || '—';
      const typeMatch = name.match(/^(primary|secondary|background|grey|danger|text)/i);
      const type = typeMatch ? typeMatch[0] : 'Other';

      if (!semanticColors[type]) semanticColors[type] = [];
      semanticColors[type].push({ name, value: obj.$value?.hex, brandRef });
    });
  }

  return { brandColors, semanticColors };
};

const colorBoxStyle = {
  width: '120px',
  height: '120px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  textAlign: 'center' as const,
  padding: '8px',
  boxSizing: 'border-box' as const,
};

export const Palette = ({
  brandBackground = '#ffffff',
  semanticBackground = '#f5f5f5',
  showBrandNames = true,
}: PaletteProps) => {
  const { brandColors, semanticColors } = getColors();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Brand */}
      <div style={{ background: brandBackground, padding: '16px', borderRadius: '8px' }}>
        <h3>Brand Colors</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {brandColors.map((color) => (
            <div
              key={color.name}
              style={{ ...colorBoxStyle, backgroundColor: color.value, color: getContrastColor(color.value), border: '2px solid transparent' }}
              title={`Brand token: ${color.name}`}
            >
              <div>{color.name}</div>
              <div>{color.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Semantic / Alias */}
      <div style={{ background: semanticBackground, padding: '16px', borderRadius: '8px' }}>
        <h3>Semantic Colors</h3>
        {Object.entries(semanticColors).map(([type, colors]) => (
          <div key={type}>
            <h4 style={{ textTransform: 'capitalize' }}>{type}</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
              {colors.map((color) => (
                <div
                  key={color.name}
                  style={{
                    ...colorBoxStyle,
                    backgroundColor: color.value,
                    color: getContrastColor(color.value),
                    border: '2px solid #999',
                    cursor: 'default',
                  }}
                  title={`Alias token: ${color.name}\nBrand: ${color.brandRef}`}
                >
                  <div>{color.name}</div>
                  <div>{color.value}</div>
                  {showBrandNames && (
                    <div style={{ fontSize: '10px', color: getContrastColor(color.value) }}>
                      Brand: {color.brandRef}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Args iniciales
Palette.args = {
  brandBackground: '#ffffff',
  semanticBackground: '#f5f5f5',
  showBrandNames: true,
};