import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from "../../ux-zion-library/src/components/Card";
import { Button } from "../../ux-zion-library/src/components/Button";
import { Divider } from "../../ux-zion-library/src/components/Divider";
import { Header } from "../../ux-zion-library/src/components/Header";
import { TextField } from "../../ux-zion-library/src/components/TextField";
import { Select } from "../../ux-zion-library/src/components/Select";
import { Toggle } from "../../ux-zion-library/src/components/Toggle";
import { IconButton } from "../../ux-zion-library/src/components/IconButton";
import { MenuOverlay, useMenuOverlay } from "../../ux-zion-library/src/components/MenuOverlay";
import { Checkbox } from "../../ux-zion-library/src/components/Checkbox";
import { ListItem } from "../../ux-zion-library/src/components/ListItem";
import { DocumentRecordPerson, ContentAdd, ContentDelete, HelpAi, ArrowCaret } from "../../ux-zion-library/src/icons";
import { colors, transparentColors } from "../../ux-zion-library/src/tokens/colors";
import { spacing } from "../../ux-zion-library/src/tokens/spacing";
import { bold } from "../../ux-zion-library/src/tokens/typography";
import { findPotentialMatches } from '../utils/censusData';

const NAME_TYPE_OPTIONS = [
  'Also Known As',
  'Art Name',
  'Birth Name',
  'Courtesy Name',
  'Married Name',
  'Posthumous Name',
  'Taboo Name'
];

export const EssentialInformationCard = ({
  state = 'review', // 'pending' | 'add' | 'edit' | 'review'
  data = {},
  onSave,
  onCancel,
  onNext,
  onEdit,
  isNewRecord = false,
  onShowFindDetails,
  onShowAISelection,
  censusData,
  currentApproach = 'A' // 'A' or 'B' - determines which AI flow to show
}) => {
  const [formData, setFormData] = useState({
    isPrimary: data.isPrimary !== undefined ? data.isPrimary : isNewRecord,
    names: data.names || [{ type: 'Birth Name', givenName: '', surname: '' }],
    sex: data.sex || '',
    race: data.race || '',
    age: data.age || ''
  });

  const [additionalNameCount, setAdditionalNameCount] = useState((data.names?.length || 1) - 1);
  const moreInfoMenu = useMenuOverlay();
  const [moreInfoFields, setMoreInfoFields] = useState({
    givenName: true,
    matronymic: false,
    namePrefix: false,
    nameSuffix: false,
    patronymic: false,
    surname: true,
    surnamePrefix: false
  });

  const [showAISuggestion, setShowAISuggestion] = useState(false);
  const [aiSuggestionName, setAISuggestionName] = useState('');

  // Check for AI suggestion when names change (Approach A only)
  useEffect(() => {
    if (currentApproach === 'A' && state === 'add' && formData.names?.[0] && censusData && onShowFindDetails) {
      const { givenName, surname } = formData.names[0];
      // Show AI suggestion after 3 characters in given name
      if (givenName && givenName.length >= 3) {
        // Check if there are hidden records matching this name
        const matches = findPotentialMatches(censusData, { givenName, surname });
        if (matches.length > 0) {
          setShowAISuggestion(true);
          setAISuggestionName(`${givenName} ${surname}`.trim());
        } else {
          setShowAISuggestion(false);
        }
      } else {
        setShowAISuggestion(false);
      }
    } else {
      setShowAISuggestion(false);
    }
  }, [formData.names, state, censusData, onShowFindDetails, currentApproach]);

  // Reset formData when entering edit or add mode
  useEffect(() => {
    if (state === 'edit' || state === 'add') {
      setFormData({
        isPrimary: data.isPrimary !== undefined ? data.isPrimary : isNewRecord,
        names: data.names || [{ type: 'Birth Name', givenName: '', surname: '' }],
        sex: data.sex || '',
        race: data.race || '',
        age: data.age || ''
      });
      setAdditionalNameCount((data.names?.length || 1) - 1);
    }
  }, [state, data, isNewRecord]);

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
          <DocumentRecordPerson
            size="sm"
            style={{ color: iconConfig.color }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Header level="h5" style={{ color: headingColor, marginBottom: showSubheading ? '2px' : 0 }}>
            Essential Information
          </Header>
          {showSubheading && (
            <div style={{ fontSize: '12px', color: colors.gray.gray60 }}>
              Name Variations and Personal Details
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
    return (
      <>
        {data.isPrimary && (
          <Header level="h5" supplementary style={{ marginBottom: spacing.xs }}>
            Primary Person
          </Header>
        )}

        {/* Name variations */}
        {data.names?.map((name, index) => (
          <div key={index} style={{ marginBottom: spacing.xs }}>
            <div style={{
              ...bold.b,
              color: colors.gray.gray100,
              marginBottom: '2px'
            }}>
              {name.type || 'Birth Name'}
            </div>
            <div style={{ fontSize: '14px', color: colors.gray.gray100 }}>
              {name.givenName && <div>Given Name: {name.givenName}</div>}
              {name.surname && <div>Surname: {name.surname}</div>}
              {name.prefix && <div>Name Prefix: {name.prefix}</div>}
              {name.suffix && <div>Name Suffix: {name.suffix}</div>}
            </div>
          </div>
        ))}

        {/* Personal details */}
        {(data.sex || data.race || data.age) && (
          <div style={{ marginBottom: spacing.xs }}>
            <div style={{
              ...bold.b,
              color: colors.gray.gray100,
              marginBottom: '2px'
            }}>
              Personal Details
            </div>
            <div style={{ fontSize: '14px', color: colors.gray.gray100 }}>
              {data.sex && <div>Sex: {data.sex}</div>}
              {data.race && <div>Race: {data.race}</div>}
              {data.age && <div>Age: {data.age}</div>}
            </div>
          </div>
        )}
      </>
    );
  };

  const updateNameField = (nameIndex, field, value) => {
    setFormData(prev => {
      const newNames = [...prev.names];
      newNames[nameIndex] = { ...newNames[nameIndex], [field]: value };
      return { ...prev, names: newNames };
    });
  };

  const addAdditionalName = () => {
    if (additionalNameCount < 2) {
      setFormData(prev => ({
        ...prev,
        names: [...prev.names, { type: 'Birth Name', givenName: '', surname: '' }]
      }));
      setAdditionalNameCount(prev => prev + 1);
    }
  };

  const removeAdditionalName = (nameIndex) => {
    setFormData(prev => ({
      ...prev,
      names: prev.names.filter((_, index) => index !== nameIndex)
    }));
    setAdditionalNameCount(prev => prev - 1);
  };

  const renderAddEditState = () => {
    const hasNameData = formData.names[0].givenName || formData.names[0].surname;

    // Show regular form (manual entry or editing)
    return (
      <>
        {/* Primary Toggle */}
        <div style={{ marginBottom: spacing.xs }}>
          <Toggle
            label="Is primary person for this record"
            checked={formData.isPrimary}
            onChange={(checked) => setFormData(prev => ({ ...prev, isPrimary: checked }))}
          />
        </div>

        {/* Primary Name Section */}
        <Header level="h6" style={{ marginBottom: spacing.xxs }}>
          Primary Name
        </Header>

        <div style={{ marginBottom: spacing.xs }}>
          <Select
            label="Name Type"
            value={formData.names[0].type}
            onChange={(e) => updateNameField(0, 'type', e.target.value)}
            options={NAME_TYPE_OPTIONS}
          />
        </div>

        {moreInfoFields.givenName && (
          <div style={{ marginBottom: spacing.xs }}>
            <TextField
              label="Given Name"
              value={formData.names[0].givenName}
              onChange={(e) => updateNameField(0, 'givenName', e.target.value)}
            />
          </div>
        )}

        {moreInfoFields.surname && (
          <div style={{ marginBottom: spacing.xs }}>
            <TextField
              label="Surname"
              value={formData.names[0].surname}
              onChange={(e) => updateNameField(0, 'surname', e.target.value)}
            />
          </div>
        )}

        {/* AI Suggestion Card */}
        {showAISuggestion && (
          <div style={{ marginBottom: spacing.xs }}>
            <Card variant="outlined" size="xxs">
              <ListItem
                heading="AI Auto Fill"
                subheading="Use AI to find the details from the transcript"
                startElement={
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: colors.purple.purple05,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <HelpAi size="sm" style={{ color: colors.purple.purple70 }} />
                  </div>
                }
                endIcon={
                  <ArrowCaret direction="forward" size="sm" style={{ color: colors.blue.blue70 }} />
                }
                dense
                onClick={() => {
                  if (onShowFindDetails) {
                    onShowFindDetails({
                      givenName: formData.names[0].givenName,
                      surname: formData.names[0].surname
                    });
                  }
                }}
              />
            </Card>
          </div>
        )}

        {moreInfoFields.namePrefix && (
          <div style={{ marginBottom: spacing.xs }}>
            <TextField
              label="Name Prefix"
              value={formData.names[0].prefix || ''}
              onChange={(e) => updateNameField(0, 'prefix', e.target.value)}
            />
          </div>
        )}

        {moreInfoFields.nameSuffix && (
          <div style={{ marginBottom: spacing.xs }}>
            <TextField
              label="Name Suffix"
              value={formData.names[0].suffix || ''}
              onChange={(e) => updateNameField(0, 'suffix', e.target.value)}
            />
          </div>
        )}

        {moreInfoFields.matronymic && (
          <div style={{ marginBottom: spacing.xs }}>
            <TextField
              label="Matronymic"
              value={formData.names[0].matronymic || ''}
              onChange={(e) => updateNameField(0, 'matronymic', e.target.value)}
            />
          </div>
        )}

        {moreInfoFields.patronymic && (
          <div style={{ marginBottom: spacing.xs }}>
            <TextField
              label="Patronymic"
              value={formData.names[0].patronymic || ''}
              onChange={(e) => updateNameField(0, 'patronymic', e.target.value)}
            />
          </div>
        )}

        {moreInfoFields.surnamePrefix && (
          <div style={{ marginBottom: spacing.xs }}>
            <TextField
              label="Surname Prefix"
              value={formData.names[0].surnamePrefix || ''}
              onChange={(e) => updateNameField(0, 'surnamePrefix', e.target.value)}
            />
          </div>
        )}

        {/* More Info Button */}
        <div style={{ marginBottom: spacing.xs }}>
          <Button
            ref={moreInfoMenu.anchorRef}
            variant="blue"
            emphasis="low"
            iconStart={ContentAdd}
            inline
            onClick={moreInfoMenu.handleClick}
          >
            More Info
          </Button>

          <MenuOverlay
            isOpen={moreInfoMenu.isOpen}
            close={moreInfoMenu.close}
            anchorRef={moreInfoMenu.anchorRef}
            position="bottom"
            align="start"
          >
            <div style={{
              paddingTop: spacing.xxs,
              paddingBottom: spacing.xxs,
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.nano
            }}>
              <Checkbox
                label="Given Name"
                checked={moreInfoFields.givenName}
                onChange={(checked) => setMoreInfoFields(prev => ({ ...prev, givenName: checked }))}
              />
              <Checkbox
                label="Matronymic"
                checked={moreInfoFields.matronymic}
                onChange={(checked) => setMoreInfoFields(prev => ({ ...prev, matronymic: checked }))}
              />
              <Checkbox
                label="Name Prefix"
                checked={moreInfoFields.namePrefix}
                onChange={(checked) => setMoreInfoFields(prev => ({ ...prev, namePrefix: checked }))}
              />
              <Checkbox
                label="Name Suffix"
                checked={moreInfoFields.nameSuffix}
                onChange={(checked) => setMoreInfoFields(prev => ({ ...prev, nameSuffix: checked }))}
              />
              <Checkbox
                label="Patronymic"
                checked={moreInfoFields.patronymic}
                onChange={(checked) => setMoreInfoFields(prev => ({ ...prev, patronymic: checked }))}
              />
              <Checkbox
                label="Surname"
                checked={moreInfoFields.surname}
                onChange={(checked) => setMoreInfoFields(prev => ({ ...prev, surname: checked }))}
              />
              <Checkbox
                label="Surname Prefix"
                checked={moreInfoFields.surnamePrefix}
                onChange={(checked) => setMoreInfoFields(prev => ({ ...prev, surnamePrefix: checked }))}
              />
            </div>
          </MenuOverlay>
        </div>

        {/* Additional Names Section */}
        {additionalNameCount > 0 && (
          <div style={{ marginTop: spacing.xs }}>
            <Header level="h6" style={{ marginBottom: spacing.xxs }}>
              Additional Names
            </Header>
            {formData.names.slice(1).map((name, index) => (
              <div key={index + 1} style={{ marginBottom: spacing.xs }}>
                <div style={{ display: 'flex', gap: spacing.xxs, alignItems: 'flex-end' }}>
                  <div style={{ flex: 1 }}>
                    <Select
                      label="Name Type"
                      value={name.type}
                      onChange={(e) => updateNameField(index + 1, 'type', e.target.value)}
                      options={NAME_TYPE_OPTIONS}
                    />
                  </div>
                  <IconButton
                    icon={ContentDelete}
                    variant="danger"
                    size="md"
                    label="Delete additional name"
                    onClick={() => removeAdditionalName(index + 1)}
                  />
                </div>
                <div style={{ marginTop: spacing.xxs }}>
                  <TextField
                    label="Given Name"
                    value={name.givenName}
                    onChange={(e) => updateNameField(index + 1, 'givenName', e.target.value)}
                  />
                </div>
                <div style={{ marginTop: spacing.xxs }}>
                  <TextField
                    label="Surname"
                    value={name.surname}
                    onChange={(e) => updateNameField(index + 1, 'surname', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Additional Name Button */}
        {additionalNameCount < 2 && (
          <div style={{ marginBottom: spacing.xs }}>
            <Button
              variant="blue"
              emphasis="medium"
              iconStart={ContentAdd}
              onClick={addAdditionalName}
            >
              Additional Name
            </Button>
          </div>
        )}

        <div style={{ marginTop: spacing.xs, marginBottom: spacing.xs }}>
          <Divider />
        </div>

        {/* Personal Details Section */}
        <Header level="h6" style={{ marginBottom: spacing.xxs }}>
          Personal Details
        </Header>

        <div style={{ marginBottom: spacing.xs }}>
          <TextField
            label="Sex"
            value={formData.sex}
            onChange={(e) => setFormData(prev => ({ ...prev, sex: e.target.value }))}
          />
        </div>

        <div style={{ marginBottom: spacing.xs }}>
          <TextField
            label="Race"
            value={formData.race}
            onChange={(e) => setFormData(prev => ({ ...prev, race: e.target.value }))}
          />
        </div>

        <div style={{ marginBottom: spacing.xs }}>
          <TextField
            label="Age"
            value={formData.age}
            onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
          />
        </div>
      </>
    );
  };

  const renderFooter = () => {
    if (state === 'add') {
      const hasNameData = formData.names[0]?.givenName || formData.names[0]?.surname;

      return (
        <Button
          variant="blue"
          emphasis="high"
          onClick={() => onNext?.(formData)}
          fullWidth
          disabled={!hasNameData}
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

EssentialInformationCard.propTypes = {
  state: PropTypes.oneOf(['pending', 'add', 'edit', 'review']),
  data: PropTypes.shape({
    isPrimary: PropTypes.bool,
    names: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      givenName: PropTypes.string,
      surname: PropTypes.string,
      prefix: PropTypes.string,
      suffix: PropTypes.string
    })),
    sex: PropTypes.string,
    race: PropTypes.string,
    age: PropTypes.string
  }),
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onNext: PropTypes.func,
  onEdit: PropTypes.func,
  isNewRecord: PropTypes.bool,
  onShowFindDetails: PropTypes.func,
  onShowAISelection: PropTypes.func,
  censusData: PropTypes.object,
  currentApproach: PropTypes.oneOf(['A', 'B'])
};
