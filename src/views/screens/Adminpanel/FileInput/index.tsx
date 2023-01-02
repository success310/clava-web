import React, { ChangeEventHandler, useCallback } from 'react';
import { FormGroup, Input, InputGroup, Label } from 'reactstrap';
import {
  faImage,
  faTrash,
  IconDefinition,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export declare type ClavaFile = { url: string; filename: string; file: File };

const FileInput: React.FC<{
  preview: string | IconDefinition;
  onChange: (text: ClavaFile | undefined) => void;
  name: string;
  progress?: number;
  disabled?: boolean;
}> = ({ name, disabled, progress, preview, onChange }) => {
  const onValueChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      if (e.target.files && e.target.files.length === 1)
        onChange({
          url: URL.createObjectURL(e.target.files[0]),
          filename: e.target.files[0].name,
          file: e.target.files[0],
        });
    },
    [onChange],
  );
  const reset = useCallback(() => {
    onChange(undefined);
  }, [onChange]);
  return (
    <FormGroup>
      <Label htmlFor={name} className="file-preview">
        {typeof preview === 'string' ? (
          preview === '' ? (
            <FontAwesomeIcon icon={faImage} />
          ) : (
            <img className="img-preview" src={preview} alt="preview" />
          )
        ) : (
          <FontAwesomeIcon icon={preview} />
        )}
        {!!progress && progress !== 0 && progress !== 100 && (
          <div className="file-progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        )}
      </Label>
      <InputGroup>
        <Input
          tabIndex={0}
          type="file"
          accept="image/*"
          name={name}
          id={name}
          onChange={onValueChange}
        />
        {typeof preview === 'string' && preview !== '' && (
          <button type="button" onClick={reset} className="input-group-addon">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </InputGroup>
    </FormGroup>
  );
};

FileInput.defaultProps = { disabled: false, progress: 0 };

export default FileInput;
