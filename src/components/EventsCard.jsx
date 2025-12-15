import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from "../../ux-zion-library/src/components/Card";
import { Button } from "../../ux-zion-library/src/components/Button";
import { IconButton } from "../../ux-zion-library/src/components/IconButton";
import { Divider } from "../../ux-zion-library/src/components/Divider";
import { Header } from "../../ux-zion-library/src/components/Header";
import { Paragraph } from "../../ux-zion-library/src/components/Paragraph";
import { Select } from "../../ux-zion-library/src/components/Select";
import { TextField } from "../../ux-zion-library/src/components/TextField";
import { ThingCalendar, ContentAdd, ContentDelete } from "../../ux-zion-library/src/icons";
import { colors, transparentColors } from "../../ux-zion-library/src/tokens/colors";
import { spacing } from "../../ux-zion-library/src/tokens/spacing";
import { bold } from "../../ux-zion-library/src/tokens/typography";

const EVENT_TYPES = [
  'Ancestral Home',
  'Apprenticeship',
  'Baptism',
  'Birth',
  'Birth Notice',
  'Birth Registration',
  'Blessing',
  'Burial',
  'Census',
  'Christening',
  'Citizenship',
  'Cremation',
  'Death',
  'Death Notice',
  'Death Registration',
  'Divorce',
  'Divorce Filing',
  'Education',
  'Elder Ordination',
  'Emigration',
  'Employment',
  'Engagement',
  'Enslavement',
  'Funeral',
  'High Priest Ordination',
  'Immigration',
  'Imprisonment',
  'Land Transaction',
  'Marriage',
  'Marriage Banns',
  'Marriage Contract',
  'Marriage Intent',
  'Marriage License',
  'Marriage Notice',
  'Marriage Registration',
  'Marriage Settlement',
  'Medical',
  'Melchizedek Priesthood Conferral',
  'Military Discharge',
  'Military Disposition',
  'Military Enlistment',
  'Military Pension',
  'Military Service',
  'Military Tour',
  'Move From',
  'Move To',
  'National Identification Issuance',
  'Naturalization',
  'Other',
  'Pension',
  'Probate',
  'Property',
  'Religious',
  'Residence',
  'School Enrollment',
  'Separation',
  'Set Apart',
  'Seventy Ordination',
  'Social Program Application',
  'Social Program Claim',
  'Social Program Correspondence',
  'Stillbirth',
  'Travel',
  'Unknown',
  'Voting',
  'Will',
  'Workhouse Admission'
];

export const EventsCard = ({
  state = 'pending', // 'pending' | 'add' | 'edit' | 'review'
  data = {},
  onSave,
  onCancel,
  onNext,
  onEdit
}) => {
  const [formData, setFormData] = useState({
    primaryEvent: data.primaryEvent || { type: '', date: '', place: '' },
    additionalEvents: data.additionalEvents || []
  });

  // Reset formData when entering edit or add mode
  useEffect(() => {
    if (state === 'edit' || state === 'add') {
      setFormData({
        primaryEvent: data.primaryEvent || { type: '', date: '', place: '' },
        additionalEvents: data.additionalEvents || []
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

  const isPrimaryEventComplete = () => {
    return formData.primaryEvent.type &&
           formData.primaryEvent.date &&
           formData.primaryEvent.place;
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
          <ThingCalendar
            size="sm"
            style={{ color: iconConfig.color }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Header level="h5" style={{ color: headingColor, marginBottom: showSubheading ? '2px' : 0 }}>
            Events
          </Header>
          {showSubheading && (
            <div style={{ fontSize: '12px', color: colors.gray.gray60 }}>
              Birth, Death, Residence, and More
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

  const renderPendingState = () => {
    if (!data.primaryEvent?.type) return null;

    return (
      <div style={{ marginTop: spacing.xs }}>
        {/* Primary Event - Muted style for pending */}
        {data.primaryEvent?.type && (
          <div style={{ marginBottom: spacing.xs }}>
            <div style={{
              ...bold.b,
              color: transparentColors.transparentGray40,
              marginBottom: '2px'
            }}>
              {data.primaryEvent.type} • Primary Event
            </div>
            <div style={{ fontSize: '14px', color: transparentColors.transparentGray40 }}>
              {data.primaryEvent.place && <div>Place: {data.primaryEvent.place}</div>}
              {data.primaryEvent.date && <div>Date: {data.primaryEvent.date}</div>}
            </div>
          </div>
        )}

        {/* Additional Events - Muted style for pending */}
        {data.additionalEvents?.map((event, index) => (
          event.type && (
            <div key={index} style={{ marginBottom: spacing.xs }}>
              <div style={{
                ...bold.b,
                color: transparentColors.transparentGray40,
                marginBottom: '2px'
              }}>
                {event.type}
              </div>
              <div style={{ fontSize: '14px', color: transparentColors.transparentGray40 }}>
                {event.place && <div>Place: {event.place}</div>}
                {event.date && <div>Date: {event.date}</div>}
              </div>
            </div>
          )
        ))}
      </div>
    );
  };

  const renderReviewState = () => {
    return (
      <>
        {/* Primary Event */}
        {data.primaryEvent?.type && (
          <div style={{ marginBottom: spacing.xs }}>
            <div style={{
              ...bold.b,
              color: colors.gray.gray100,
              marginBottom: '2px'
            }}>
              {data.primaryEvent.type} • Primary Event
            </div>
            <div style={{ fontSize: '14px', color: colors.gray.gray100 }}>
              {data.primaryEvent.place && <div>Place: {data.primaryEvent.place}</div>}
              {data.primaryEvent.date && <div>Date: {data.primaryEvent.date}</div>}
            </div>
          </div>
        )}

        {/* Additional Events */}
        {data.additionalEvents?.map((event, index) => (
          event.type && (
            <div key={index} style={{ marginBottom: spacing.xs }}>
              <div style={{
                ...bold.b,
                color: colors.gray.gray100,
                marginBottom: '2px'
              }}>
                {event.type}
              </div>
              <div style={{ fontSize: '14px', color: colors.gray.gray100 }}>
                {event.place && <div>Place: {event.place}</div>}
                {event.date && <div>Date: {event.date}</div>}
              </div>
            </div>
          )
        ))}
      </>
    );
  };

  const renderAddEditState = () => {
    return (
      <>
        <Header level="h6" style={{ marginBottom: spacing.xxs }}>
          Record Primary Event
        </Header>

        {/* Primary Event Fields */}
        <div style={{ marginBottom: spacing.xs }}>
          <Select
            label="Event Type"
            value={formData.primaryEvent.type}
            onChange={(e) => {
              setFormData(prev => ({
                ...prev,
                primaryEvent: { ...prev.primaryEvent, type: e.target.value }
              }));
            }}
            options={EVENT_TYPES}
          />
        </div>

        <div style={{ marginBottom: spacing.xs }}>
          <TextField
            label="Date"
            value={formData.primaryEvent.date}
            onChange={(e) => {
              setFormData(prev => ({
                ...prev,
                primaryEvent: { ...prev.primaryEvent, date: e.target.value }
              }));
            }}
          />
        </div>

        <div style={{ marginBottom: spacing.xs }}>
          <TextField
            label="Place"
            value={formData.primaryEvent.place}
            onChange={(e) => {
              setFormData(prev => ({
                ...prev,
                primaryEvent: { ...prev.primaryEvent, place: e.target.value }
              }));
            }}
          />
        </div>

        {/* Additional Events */}
        {formData.additionalEvents.length > 0 && (
          <Header level="h6" style={{ marginBottom: spacing.xxs, marginTop: spacing.xs }}>
            Additional Events
          </Header>
        )}

        {formData.additionalEvents.map((event, index) => (
          <div key={index} style={{ marginBottom: spacing.xs }}>
            <div style={{ marginBottom: spacing.xs, display: 'flex', gap: spacing.xxs, alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <Select
                  label="Event Type"
                  value={event.type}
                  onChange={(e) => {
                    const newEvents = [...formData.additionalEvents];
                    newEvents[index].type = e.target.value;
                    setFormData(prev => ({ ...prev, additionalEvents: newEvents }));
                  }}
                  options={EVENT_TYPES}
                />
              </div>
              <IconButton
                icon={ContentDelete}
                variant="danger"
                size="md"
                label={`Remove event`}
                onClick={() => {
                  const newEvents = formData.additionalEvents.filter((_, i) => i !== index);
                  setFormData(prev => ({ ...prev, additionalEvents: newEvents }));
                }}
              />
            </div>

            <div style={{ marginBottom: spacing.xs }}>
              <TextField
                label="Date"
                value={event.date}
                onChange={(e) => {
                  const newEvents = [...formData.additionalEvents];
                  newEvents[index].date = e.target.value;
                  setFormData(prev => ({ ...prev, additionalEvents: newEvents }));
                }}
              />
            </div>

            <div style={{ marginBottom: spacing.xs }}>
              <TextField
                label="Place"
                value={event.place}
                onChange={(e) => {
                  const newEvents = [...formData.additionalEvents];
                  newEvents[index].place = e.target.value;
                  setFormData(prev => ({ ...prev, additionalEvents: newEvents }));
                }}
              />
            </div>
          </div>
        ))}

        {/* Add Additional Event Button */}
        <div style={{ marginBottom: spacing.xs }}>
          <Button
            variant="blue"
            emphasis="low"
            inline={true}
            iconStart={ContentAdd}
            onClick={() => {
              setFormData(prev => ({
                ...prev,
                additionalEvents: [...prev.additionalEvents, { type: '', date: '', place: '' }]
              }));
            }}
          >
            Additional Event
          </Button>
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
          disabled={!isPrimaryEventComplete()}
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

      {state === 'pending' && renderPendingState()}

      {(state === 'add' || state === 'edit' || state === 'review') && (
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

EventsCard.propTypes = {
  state: PropTypes.oneOf(['pending', 'add', 'edit', 'review']),
  data: PropTypes.shape({
    primaryEvent: PropTypes.shape({
      type: PropTypes.string,
      date: PropTypes.string,
      place: PropTypes.string
    }),
    additionalEvents: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      date: PropTypes.string,
      place: PropTypes.string
    }))
  }),
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onNext: PropTypes.func,
  onEdit: PropTypes.func
};
