import React from 'react';
import { Input, Row, Col } from 'reactstrap';
import { upperBody } from 'server/models/Program/UpperBody';
import { lowerBody } from 'server/models/Program/LowerBody';

type SetKeys = '0' | '1' | '2' | '3';
enum FriendlyNames {
  'flatBench' = 'Flat Bench',
  'row' = 'Row',
  'inclineDbBench' = 'Incline Dumbbell Bench'
}

interface ExerciseSet {
  weight: number;
  reps: number;  
}

export interface Names {
  exerciseName: string;
  setName: SetKeys;
}

interface Props {
  name: keyof typeof upperBody | keyof typeof lowerBody;
  stats: ExerciseSet[];
  onChange: (names: Names, value: number) => void;
}

interface SetProps {
  name: SetKeys;
  stats: ExerciseSet[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SetComponent({ name, stats, onChange }: SetProps) {
  const set = Number(name);
  const weight = stats[set] && stats[set].weight || '';
  const reps = stats[set] && stats[set].reps || '';
  return (
    <Row>
      <Col sm={1}>
      <h5><strong>{set + 1}</strong></h5>
      </Col>
      <Col sm={5}>
        <Input placeholder='Reps' value={reps} name='reps' onChange={onChange} />
      </Col>
      <Col sm={5}>
        <Input placeholder='Kg' value={weight} name='weight' onChange={onChange} />
      </Col>
    </Row>
  );
};

export default function Exercise({ name: exerciseName, stats, onChange }: Props) {
  
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    onChange({ exerciseName, setName: name as SetKeys }, Number(value));
  };
  return (
    <Row sm={6} md={4}>
      <h3 className='ml-2'><strong>{FriendlyNames[exerciseName]}</strong></h3>
      <Col sm={12}>
        <SetComponent stats={stats} onChange={handleChange} name='0' />
      </Col>
      <Col sm={12}>
        <SetComponent stats={stats} onChange={handleChange} name='1' />
      </Col>
      <Col sm={12}>
        <SetComponent stats={stats} onChange={handleChange} name='2' />
      </Col>
      <Col sm={12}>
        <SetComponent stats={stats} onChange={handleChange} name='3' />
      </Col>
    </Row>
  );
};