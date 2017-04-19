import * as React from 'react';

import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import Checkbox from 'material-ui/Checkbox';
import Subject from 'material-ui/svg-icons/action/subject';
import Delete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';

const types = [
    'double', 'float',
    'int32', 'int64',
    'uint32', 'uint64', 'sint32', 'sint64',
    'fixed32', 'fixed64', 'sfixed32', 'sfixed64',
    'bool', 'string', 'bytes'
];

interface FieldProps {
    name: string;
    type: string;
    repeated: boolean;
    onNameChange: (name: string) => void;
    onTypeChange: (type: string) => void;
    onRepeatedChange: (repeated: boolean) => void;
    onDelete: () => void;
}

class Field extends React.Component<FieldProps, null> {
    render() {
        return (
            <div style={{
                position: 'relative',
                paddingLeft: 35,
                marginBottom: '2em'
            }}>
                <Subject style={{ position: 'absolute', top: 38, left: 0 }} />
                <IconButton style={{ position: 'absolute', top: 60, left: -12 }} onTouchTap={e => this.props.onDelete()}>
                    <Delete />
                </IconButton>
                <TextField
                    floatingLabelText="Field Name"
                    onChange={e => this.props.onNameChange((e.target as HTMLInputElement).value)}
                    value={this.props.name}
                />
                <AutoComplete
                    searchText={this.props.type}
                    onUpdateInput={this.props.onTypeChange}
                    floatingLabelText="Data Type"
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={types}
                    maxSearchResults={5}
                />
                <Checkbox
                    label="Repeated"
                    checked={this.props.repeated}
                    onCheck={(e, v) => this.props.onRepeatedChange(v)}
                />
            </div>
        );
    }
}

export default Field;