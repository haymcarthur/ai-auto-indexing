import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { InfoSheet } from '../../ux-zion-library/src/components/InfoSheet';
import { Heading } from '../../ux-zion-library/src/components/Heading';
import { Paragraph } from '../../ux-zion-library/src/components/Paragraph';
import { Button } from '../../ux-zion-library/src/components/Button';
import { Card } from '../../ux-zion-library/src/components/Card';
import { Header } from '../../ux-zion-library/src/components/Header';
import { ContentCheck } from '../../ux-zion-library/src/icons';
import { spacing } from '../../ux-zion-library/src/tokens/spacing';
import { colors } from '../../ux-zion-library/src/tokens/colors';
import { findPotentialMatches } from '../utils/censusData';

/**
 * FindDetailsDialog
 *
 * InfoSheet for AI-assisted detail extraction. Shows loading state
 * while "AI" processes the document, then displays matching records
 * for user selection.
 */

// Helper function to format relationship labels
const formatRelationshipLabel = (label) => {
  if (!label) return 'Other';

  // Convert SIBLING_IN_LAW to Sibling In Law
  return label
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const FindDetailsDialog = ({
  isOpen,
  onClose,
  onBack,
  searchCriteria,
  censusData,
  onSelectRecord
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setMatches([]);

      // Simulate AI processing for 5 seconds (5000ms)
      const timer = setTimeout(() => {
        const potentialMatches = findPotentialMatches(censusData, searchCriteria);
        setMatches(potentialMatches);
        setIsLoading(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, searchCriteria, censusData]);

  const handleSelectRecord = (match) => {
    onSelectRecord(match);
  };

  const handleEnterManually = () => {
    if (onBack) {
      onBack();
    } else {
      onClose();
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <InfoSheet
        title="Manage Names"
        subtitle="Finding Details"
        panel={true}
        onBack={onClose}
        close={onClose}
        size="lg"
        elevated={false}
      >
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
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: `${spacing.lg} 0`
        }}>
          <Heading size="h6" style={{ marginBottom: spacing.xs }}>
            Finding Details
          </Heading>

          <Paragraph size="sm" style={{ marginBottom: spacing.md, maxWidth: '400px' }}>
            AI is analyzing the transcript on this document to find any information that matches {searchCriteria?.givenName} {searchCriteria?.surname}.
          </Paragraph>

          <img
            src="/SearchForName.gif"
            alt="Searching for names"
            style={{
              maxWidth: '400px',
              marginBottom: spacing.md
            }}
          />

          <Button
            variant="gray"
            emphasis="medium"
            fullWidth
            onClick={handleEnterManually}
          >
            Enter Manually
          </Button>
        </div>
      </InfoSheet>
    );
  }

  // Results state
  return (
    <InfoSheet
      title="Manage Names"
      subtitle="Matching Names"
      panel={true}
      onBack={onClose}
      close={onClose}
      size="lg"
      elevated={false}
    >
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
      <Paragraph size="sm" secondary style={{ marginBottom: spacing.xs, textAlign: 'center' }}>
        Are any of these a match for who you are looking for?
      </Paragraph>

      <div style={{ marginBottom: spacing.md }}>
        <Button
          variant="gray"
          emphasis="medium"
          fullWidth
          onClick={handleEnterManually}
        >
          Enter Manually
        </Button>
      </div>

      {matches.length === 0 ? (
        <Paragraph size="sm" secondary style={{
          textAlign: 'center',
          padding: `${spacing.md} 0`
        }}>
          No matching records found in the census data.
        </Paragraph>
      ) : (
        matches.map((match) => {
          const primaryPerson = match.allPeople.find(p => p.id === match.primaryId);

          // Build vital info lines
          const vitalInfoLines = [];
          if (primaryPerson?.sex && primaryPerson.sex !== '') {
            vitalInfoLines.push({ label: 'Sex', value: primaryPerson.sex });
          }
          if (primaryPerson?.race && primaryPerson.race !== '') {
            vitalInfoLines.push({ label: 'Race', value: primaryPerson.race });
          }
          if (primaryPerson?.age && primaryPerson.age !== '') {
            vitalInfoLines.push({ label: 'Age', value: primaryPerson.age.toString() });
          }

          // Build relationship lines
          const relationshipLines = match.allPeople
            .filter(p => p.id !== match.primaryId)
            .map(p => ({
              label: formatRelationshipLabel(p.relationship),
              value: `${p.givenName || ''} ${p.surname || ''}`.trim()
            }))
            .filter(line => line.value !== ''); // Filter out empty names

          // Get events (from the record)
          const events = match.record?.events || [];

          return (
            <Card
              key={match.recordId}
              variant="none"
              size="xxs"
              style={{
                marginBottom: spacing.md,
                backgroundColor: colors.gray.gray00,
                border: `1px solid ${colors.gray.gray20}`,
                padding: spacing.xxs,
                borderRadius: spacing.nano
              }}
            >
              <div style={{ marginBottom: spacing.xs }}>
                <div style={{
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  color: colors.gray.gray60,
                  marginBottom: '2px',
                  letterSpacing: '0.5px'
                }}>
                  Primary Person
                </div>
                <Heading size="h5">
                  {match.primaryName}
                </Heading>
              </div>

              {vitalInfoLines.length > 0 && (
                <div style={{ marginBottom: spacing.xs }}>
                  <div style={{ marginBottom: '2px' }}>
                    <Header level="h6">Vital Information</Header>
                  </div>
                  {vitalInfoLines.map((line, idx) => (
                    <div key={idx} style={{ marginBottom: '4px' }}>
                      <Paragraph size="sm" style={{ color: colors.gray.gray100 }}>
                        <span style={{ color: colors.gray.gray60 }}>{line.label}: </span>
                        {line.value}
                      </Paragraph>
                    </div>
                  ))}
                </div>
              )}

              {relationshipLines.length > 0 && (
                <div style={{ marginBottom: spacing.xs }}>
                  <div style={{ marginBottom: '2px' }}>
                    <Header level="h6">Record Group Member Relations</Header>
                  </div>
                  {relationshipLines.map((line, idx) => (
                    <div key={idx} style={{ marginBottom: '4px' }}>
                      <Paragraph size="sm" style={{ color: colors.gray.gray100 }}>
                        <span style={{ color: colors.gray.gray60 }}>{line.label}: </span>
                        {line.value}
                      </Paragraph>
                    </div>
                  ))}
                </div>
              )}

              {events.length > 0 && events.map((event, eventIndex) => {
                const eventLines = [
                  ...(event.date ? [{ label: 'Date', value: event.date }] : []),
                  ...(event.place ? [{ label: 'Place', value: event.place }] : [])
                ];

                return (
                  <div key={eventIndex} style={{ marginBottom: spacing.xs }}>
                    <div style={{ marginBottom: '2px' }}>
                      <Header level="h6">{event.type || 'Event'}</Header>
                    </div>
                    {eventLines.map((line, idx) => (
                      <div key={idx} style={{ marginBottom: '4px' }}>
                        <Paragraph size="sm" style={{ color: colors.gray.gray100 }}>
                          <span style={{ color: colors.gray.gray60 }}>{line.label}: </span>
                          {line.value}
                        </Paragraph>
                      </div>
                    ))}
                  </div>
                );
              })}

              <Button
                variant="blue"
                emphasis="medium"
                fullWidth
                iconStart={ContentCheck}
                onClick={() => handleSelectRecord(match)}
              >
                Select
              </Button>
            </Card>
          );
        })
      )}
    </InfoSheet>
  );
};

FindDetailsDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  searchCriteria: PropTypes.shape({
    givenName: PropTypes.string,
    surname: PropTypes.string
  }),
  censusData: PropTypes.object.isRequired,
  onSelectRecord: PropTypes.func.isRequired
};
