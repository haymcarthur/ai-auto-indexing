import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from "../../ux-zion-library/src/components/Card";
import { Button } from "../../ux-zion-library/src/components/Button";
import { TextField } from "../../ux-zion-library/src/components/TextField";
import { IconButton } from "../../ux-zion-library/src/components/IconButton";
import { Divider } from "../../ux-zion-library/src/components/Divider";
import { Header } from "../../ux-zion-library/src/components/Header";
import { Paragraph } from "../../ux-zion-library/src/components/Paragraph";
import { MenuOverlay, useMenuOverlay } from "../../ux-zion-library/src/components/MenuOverlay";
import { Checkbox } from "../../ux-zion-library/src/components/Checkbox";
import { NoticeInfo, ContentAdd, ContentDelete } from "../../ux-zion-library/src/icons";
import { colors, transparentColors } from "../../ux-zion-library/src/tokens/colors";
import { spacing } from "../../ux-zion-library/src/tokens/spacing";

const ADDITIONAL_FACTS_OPTIONS = [
  'Burial method',
  'Clan',
  'Education',
  'Ethnicity',
  'Marital Status',
  'Military Rank',
  'Nationality',
  'Occupation',
  'Religion',
  'Tribe'
];

export const AdditionalFactsCard = ({
  state = 'review', // 'pending' | 'add' | 'edit' | 'review'
  data = {},
  onSave,
  onCancel,
  onNext,
  onEdit
}) => {
  const [formData, setFormData] = useState({
    facts: data.facts || []
  });

  const factsMenu = useMenuOverlay();

  // Reset formData when entering edit mode (to handle cancel)
  useEffect(() => {
    if (state === 'edit') {
      setFormData({
        facts: data.facts || []
      });
    }
  }, [state, data]);

  const getIconConfig = () => {
    switch (state) {
      case 'add':
      case 'edit':
        return {
          color: colors.yellow.yellow90,
          bg: colors.yellow.yellow05
        };
      case 'review':
        return {
          color: colors.green.green90,
          bg: colors.green.green05
        };
      case 'pending':
      default:
        return {
          color: colors.gray.gray50,
          bg: colors.gray.gray03
        };
    }
  };

  const iconConfig = getIconConfig();

  const handleToggleFact = (factType) => {
    const existingFact = formData.facts.find(f => f.type === factType);

    if (existingFact) {
      // Remove the fact
      setFormData(prev => ({
        ...prev,
        facts: prev.facts.filter(f => f.type !== factType)
      }));
    } else {
      // Add the fact
      setFormData(prev => ({
        ...prev,
        facts: [...prev.facts, { type: factType, value: '' }]
      }));
    }
  };

  const handleFactValueChange = (factType, value) => {
    setFormData(prev => ({
      ...prev,
      facts: prev.facts.map(f =>
        f.type === factType ? { ...f, value } : f
      )
    }));
  };

  const handleDeleteFact = (factType) => {
    setFormData(prev => ({
      ...prev,
      facts: prev.facts.filter(f => f.type !== factType)
    }));
  };

  const renderHeader = () => {
    const headingColor = state === 'pending' ? transparentColors.transparentGray40 : colors.gray.gray100;
    const showSubheading = state === 'pending' || state === 'add';

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing.xxs,
        marginBottom: state === 'pending' ? 0 : spacing.xs
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: iconConfig.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <NoticeInfo
            size="sm"
            style={{ color: iconConfig.color }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Header level="h5" style={{ color: headingColor, marginBottom: showSubheading ? '2px' : 0 }}>
            Additional Facts
          </Header>
          {showSubheading && (
            <div style={{ fontSize: '12px', color: colors.gray.gray60 }}>
              Occupation, Marital Status, and More
            </div>
          )}
        </div>
        {state === 'review' && (
          <Button
            variant="blue"
            emphasis="low"
            inline={true}
            onClick={onEdit}
          >
            Edit
          </Button>
        )}
      </div>
    );
  };

  const renderReviewState = () => {
    // Filter out facts with empty values
    const factsWithValues = data.facts?.filter(fact => fact.value && fact.value.trim() !== '') || [];

    if (factsWithValues.length === 0) {
      return (
        <Paragraph size="sm" style={{ fontStyle: 'italic' }}>
          No additional facts
        </Paragraph>
      );
    }

    return (
      <div>
        {factsWithValues.map((fact, index) => (
          <Paragraph key={index} size="sm" style={{ marginBottom: index < factsWithValues.length - 1 ? '4px' : 0 }}>
            {fact.type}: {fact.value}
          </Paragraph>
        ))}
      </div>
    );
  };

  const renderAddEditState = () => {
    return (
      <>
        {/* Display selected facts as text fields */}
        {formData.facts.map((fact, index) => (
          <div key={fact.type} style={{ marginBottom: spacing.xs }}>
            <div style={{ display: 'flex', gap: spacing.xxs, alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <TextField
                  label={fact.type}
                  value={fact.value}
                  onChange={(e) => handleFactValueChange(fact.type, e.target.value)}
                />
              </div>
              <IconButton
                icon={ContentDelete}
                variant="danger"
                size="md"
                label={`Remove ${fact.type}`}
                onClick={() => handleDeleteFact(fact.type)}
              />
            </div>
          </div>
        ))}

        <div style={{ marginBottom: spacing.xs }}>
          <Button
            ref={factsMenu.anchorRef}
            variant="blue"
            emphasis="low"
            inline={true}
            iconStart={ContentAdd}
            onClick={factsMenu.handleClick}
          >
            Additional Facts
          </Button>

          <MenuOverlay
            isOpen={factsMenu.isOpen}
            close={factsMenu.close}
            anchorRef={factsMenu.anchorRef}
            position="top"
            align="start"
          >
            <div style={{
              paddingTop: spacing.xxs,
              paddingBottom: spacing.xxs,
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.nano
            }}>
              {ADDITIONAL_FACTS_OPTIONS.map((option) => {
                const isSelected = formData.facts.some(f => f.type === option);
                return (
                  <Checkbox
                    key={option}
                    label={option}
                    checked={isSelected}
                    onChange={(checked) => handleToggleFact(option)}
                  />
                );
              })}
            </div>
          </MenuOverlay>
        </div>
      </>
    );
  };

  const renderFooter = () => {
    if (state === 'add') {
      return (
        <Button
          variant="blue"
          emphasis="high"
          onClick={() => onNext?.(formData)}
          fullWidth
        >
          Next
        </Button>
      );
    }

    if (state === 'edit') {
      return (
        <div style={{ display: 'flex', gap: spacing.nano }}>
          <Button
            variant="blue"
            emphasis="medium"
            onClick={() => onCancel?.()}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            variant="blue"
            emphasis="high"
            onClick={() => onSave?.(formData)}
            fullWidth
          >
            Save
          </Button>
        </div>
      );
    }

    return null;
  };

  return (
    <Card
      variant={state === 'add' || state === 'edit' ? 'elevated' : 'outlined'}
      size="xxs"
    >
      {renderHeader()}

      {state !== 'pending' && (
        <>
          {state === 'review' ? renderReviewState() : renderAddEditState()}

          {state === 'add' && renderFooter() && (
            <div style={{ marginTop: spacing.xs }}>
              {renderFooter()}
            </div>
          )}

          {state === 'edit' && renderFooter() && (
            <div style={{ marginTop: spacing.xs }}>
              {renderFooter()}
            </div>
          )}
        </>
      )}
    </Card>
  );
};

AdditionalFactsCard.propTypes = {
  state: PropTypes.oneOf(['pending', 'add', 'edit', 'review']),
  data: PropTypes.shape({
    facts: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      value: PropTypes.string
    }))
  }),
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onNext: PropTypes.func,
  onEdit: PropTypes.func
};
