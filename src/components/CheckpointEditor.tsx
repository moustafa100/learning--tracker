import React, { useState } from 'react';

// Define TypeScript interfaces matching the Pydantic models
export interface LearningCheckpoint {
  description: string;
  criteria: string[];
  verification: string;
  answer?: string;
}

export interface CheckpointsModel {
  checkpoints: LearningCheckpoint[];
}

interface CheckpointEditorProps {
  checkpointsModel: CheckpointsModel;
  onUpdate?: (model: CheckpointsModel) => void;
}

const CheckpointEditor: React.FC<CheckpointEditorProps> = ({ 
  checkpointsModel, 
  onUpdate 
}) => {
  const [checkpoints, setCheckpoints] = useState<LearningCheckpoint[]>(
    checkpointsModel.checkpoints.map(cp => ({ ...cp }))
  );
  const [acceptedCheckpoints, setAcceptedCheckpoints] = useState<number[]>([]);

  // Update a checkpoint field
  const updateCheckpoint = (index: number, field: keyof LearningCheckpoint, value: any) => {
    const newCheckpoints = [...checkpoints];
    newCheckpoints[index] = { ...newCheckpoints[index], [field]: value };
    setCheckpoints(newCheckpoints);
    if (onUpdate) {
      onUpdate({ checkpoints: newCheckpoints });
    }
  };

  // Add a new checkpoint
  const addNewCheckpoint = () => {
    const newCheckpoint: LearningCheckpoint = {
      description: '',
      criteria: [],
      verification: '',
      answer: ''
    };
    const newCheckpoints = [...checkpoints, newCheckpoint];
    setCheckpoints(newCheckpoints);
    if (onUpdate) {
      onUpdate({ checkpoints: newCheckpoints });
    }
  };

  // Remove a checkpoint
  const removeCheckpoint = (index: number) => {
    const newCheckpoints = checkpoints.filter((_, i) => i !== index);
    setCheckpoints(newCheckpoints);
    // Remove from accepted checkpoints if present
    setAcceptedCheckpoints(acceptedCheckpoints.filter(i => i !== index));
    if (onUpdate) {
      onUpdate({ checkpoints: newCheckpoints });
    }
  };

  // Add a criterion to a checkpoint
  const addCriterion = (checkpointIndex: number) => {
    const newCheckpoints = [...checkpoints];
    newCheckpoints[checkpointIndex].criteria = [
      ...newCheckpoints[checkpointIndex].criteria,
      ''
    ];
    setCheckpoints(newCheckpoints);
    if (onUpdate) {
      onUpdate({ checkpoints: newCheckpoints });
    }
  };

  // Update a criterion
  const updateCriterion = (checkpointIndex: number, criterionIndex: number, value: string) => {
    const newCheckpoints = [...checkpoints];
    newCheckpoints[checkpointIndex].criteria = [
      ...newCheckpoints[checkpointIndex].criteria
    ];
    newCheckpoints[checkpointIndex].criteria[criterionIndex] = value;
    setCheckpoints(newCheckpoints);
    if (onUpdate) {
      onUpdate({ checkpoints: newCheckpoints });
    }
  };

  // Remove a criterion
  const removeCriterion = (checkpointIndex: number, criterionIndex: number) => {
    const newCheckpoints = [...checkpoints];
    newCheckpoints[checkpointIndex].criteria = newCheckpoints[checkpointIndex].criteria.filter(
      (_, i) => i !== criterionIndex
    );
    setCheckpoints(newCheckpoints);
    if (onUpdate) {
      onUpdate({ checkpoints: newCheckpoints });
    }
  };

  // Toggle checkpoint acceptance
  const toggleAcceptCheckpoint = (index: number) => {
    if (acceptedCheckpoints.includes(index)) {
      setAcceptedCheckpoints(acceptedCheckpoints.filter(i => i !== index));
    } else {
      setAcceptedCheckpoints([...acceptedCheckpoints, index]);
    }
  };

  return (
    <div className="checkpoint-editor p-5 border rounded-2xl transition-colors duration-300 bg-white/80 border-amber-100 dark:bg-slate-800/90 dark:border-slate-700">
      {checkpoints.map((checkpoint, index) => (
        <div key={index} className="checkpoint mb-6 pb-6 border-b last:border-b-0 border-amber-100 dark:border-slate-700">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold m-0">Checkpoint {index + 1}</h3>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={acceptedCheckpoints.includes(index)}
                  onChange={() => toggleAcceptCheckpoint(index)}
                  className="h-4 w-4"
                />
                Accept
              </label>
              <button
                onClick={() => removeCheckpoint(index)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Delete checkpoint
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description:</label>
            <textarea
              value={checkpoint.description}
              onChange={(e) => updateCheckpoint(index, 'description', e.target.value)}
              className="w-full p-2 border rounded h-20 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
              placeholder="Enter checkpoint description"
            />
          </div>

          {/* Criteria */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Criteria:</label>
            <div className="space-y-2">
              {checkpoint.criteria.map((criterion, criterionIndex) => (
                <div key={criterionIndex} className="flex items-center gap-2">
                  <span className="w-6 text-sm">{criterionIndex + 1}.</span>
                  <input
                    type="text"
                    value={criterion}
                    onChange={(e) => updateCriterion(index, criterionIndex, e.target.value)}
                    className="flex-1 p-2 border rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                    placeholder="Enter criterion"
                  />
                  <button
                    onClick={() => removeCriterion(index, criterionIndex)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => addCriterion(index)}
              className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
            >
              Add criterion
            </button>
          </div>

          {/* Verification */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Verification:</label>
            <textarea
              value={checkpoint.verification}
              onChange={(e) => updateCheckpoint(index, 'verification', e.target.value)}
              className="w-full p-2 border rounded h-20 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
              placeholder="Enter verification method"
            />
          </div>

          {/* Answer (Human feedback) */}
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Answer (from human):</label>
            <textarea
              value={checkpoint.answer ?? ''}
              onChange={(e) => updateCheckpoint(index, 'answer', e.target.value)}
              className="w-full p-2 border rounded h-24 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
              placeholder="Provide an example answer or explanation"
            />
          </div>
        </div>
      ))}

      {/* Add Checkpoint Button */}
      <button
        onClick={addNewCheckpoint}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add checkpoint
      </button>
    </div>
  );
};

export default CheckpointEditor;


