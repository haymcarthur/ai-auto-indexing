import React from 'react';
import { InfoSheet } from '../../ux-zion-library/src/components/InfoSheet';
import { Paragraph } from '../../ux-zion-library/src/components/Paragraph';
import { Button } from '../../ux-zion-library/src/components/Button';
import { colors } from '../../ux-zion-library/src/tokens/colors';

/**
 * SelectNameInfoSheet - Instruction panel for AI highlight selection mode
 * Displays instructions for selecting a name from the census document
 *
 * Pattern: InfoSheet panel (matches FindDetailsDialog and AddNameInfoSheet style)
 */
export const SelectNameInfoSheet = ({ onCancel, onAddManually }) => {

  return (
    <InfoSheet
      title="Manage Names"
      subtitle="Select Name from Document"
      panel={true}
      onBack={onCancel}
      close={onCancel}
      size="lg"
      elevated={false}
    >
      {/* Yellow top stroke for panel branding */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          backgroundColor: colors.yellow.yellow60
        }}
      />

      <Paragraph
        size="md"
        style={{
          marginBottom: '32px',
          lineHeight: '1.6'
        }}
      >
        Select the highlighted name on the document that you would like to add.
      </Paragraph>

      <Button
        onClick={onAddManually}
        size="md"
        variant="blue"
        emphasis="medium"
      >
        Enter Name Manually
      </Button>
    </InfoSheet>
  );
};
