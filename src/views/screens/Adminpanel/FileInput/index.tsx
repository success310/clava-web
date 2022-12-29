import React, { ChangeEventHandler, useCallback } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import { IconDefinition } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export declare type ClavaFile = { url: string; filename: string; file: File };

const FileInput: React.FC<{
  preview: string | IconDefinition;
  onChange: (text: ClavaFile) => void;
  name: string;
  disabled?: boolean;
}> = ({ name, disabled, preview, onChange }) => {
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
  return (
    <FormGroup>
      <Label htmlFor={name}>
        {typeof preview === 'string' ? (
          <img className="img-preview" src={preview} alt="preview" />
        ) : (
          <FontAwesomeIcon icon={preview} />
        )}
      </Label>
      <Input
        tabIndex={0}
        type="file"
        accept="image/*"
        name={name}
        id={name}
        onChange={onValueChange}
      />
    </FormGroup>
  );
};

FileInput.defaultProps = { disabled: false };

export default FileInput;
