import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Field from '../components/field';
import RaiseButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import Add from 'material-ui/svg-icons/content/add';
import Checkbox from 'material-ui/Checkbox';
const cfetch = require('cfetch');
const download = require('downloadjs');

interface MessageField {
    name: string;
    type: string;
    repeated: boolean;
}

interface IndexState {
    name: string;
    fields: MessageField[];
    targets: {};
}

class Index extends React.Component<null, IndexState> {
    state = {
        name: '',
        fields: [{ name: '', type: '', repeated: false }],
        targets: {}
    };
    handleMessageNameChange = (name: string) => {
        this.setState({ name });
    }
    handleAppendField = () => {
        this.setState({ fields: [...this.state.fields, { name: '', type: '', repeated: false }] });
    }
    handleFieldNameChange = (i: number) => (name: string) => {
        this.state.fields[i].name = name;
        this.forceUpdate();
    }
    handleFieldDelete = (key: number) => () => {
        this.setState({ fields: this.state.fields.filter((v, i) => i !== key) });
    }
    handleFieldTypeChange = (key: number) => (type: string) => {
        this.state.fields[key].type = type;
        this.forceUpdate();
    }
    handleFieldRepeatedChange = (key: number) => (repeated: boolean) => {
        this.state.fields[key].repeated = repeated;
        this.forceUpdate();
    }
    handleGenerate = () => {
        let lines = [];
        lines.push(
            `syntax = "proto3";`,
            `message ${this.state.name} {`,
            ...this.state.fields.map((v, i) => `\t${v.repeated ? 'repeated ' : ''}${v.type} ${v.name} = ${i + 1};`),
            `}`
        );
        let res = lines.join('\n');
        let req = { title: this.state.name, body: res, targets: this.state.targets };
        (cfetch('http://120.25.205.159:4000')
            ('POST')('/')
            (req) as Promise<Response>)
            .then(v => v.blob())
            .then(v => download(v))
            .catch(r => {
                console.log(r); // tslint:disable-line
                console.log(req); // tslint:disable-line
            });
    }
    handleTarget = (language: string) => (e: {}, v: boolean): void => {
        this.state.targets[language] = v;
    }
    render() {
        return (
            <div>
                <AppBar title="Visual Protocol Buffer" />
                <div style={{ margin: '0 auto', width: '80%' }}>
                    <p>Visual Protocol Buffer is an online
                        <a href="https://developers.google.com/protocol-buffers/"> Protocol Buffer (protobuf) </a>
                        editor, which allows you create arbitrary application-layer protocol.
                    </p>
                    <p>
                        Application-layer protocol defines format of message in bytes.
                    </p>
                    <p>
                        Protocol Buffer can define a subset of TCP/IP protocols,
                        which are less weight, high performance and platform free.
                    </p>
                    <TextField
                        floatingLabelText="Message Name"
                        fullWidth={true}
                        onChange={e => this.handleMessageNameChange((e.target as HTMLInputElement).value)}
                    />
                    <Subheader>Message Fields</Subheader>
                    {
                        this.state.fields.map((v, i) => (
                            <Field
                                key={i}
                                name={v.name}
                                type={v.type}
                                repeated={v.repeated}
                                onNameChange={this.handleFieldNameChange(i)}
                                onDelete={this.handleFieldDelete(i)}
                                onTypeChange={this.handleFieldTypeChange(i)}
                                onRepeatedChange={this.handleFieldRepeatedChange(i)}
                            />
                        ))
                    }
                    <RaiseButton
                        label="Append Field"
                        secondary={true}
                        onTouchTap={this.handleAppendField}
                        icon={<Add />}
                    />
                    <Subheader>Target language options</Subheader>
                    <p>
                        Choose target language(s), we will generate the chosen language(s) code for you.
                        Generally, they are plain object classes.
                    </p>
                    <Checkbox label="C++" onCheck={this.handleTarget('cpp')} />
                    <Checkbox label="Java" onCheck={this.handleTarget('java')} />
                    <Checkbox label="Python" onCheck={this.handleTarget('python')} />
                    <Checkbox label="Objective-C" onCheck={this.handleTarget('objc')} />
                    <Checkbox label="C#" onCheck={this.handleTarget('cshape')} disabled={true} />
                    <Checkbox label="JavaNano" onCheck={this.handleTarget('javanano')} />
                    <Checkbox label="JavaScript" onCheck={this.handleTarget('js')} />
                    <Checkbox label="Ruby" onCheck={this.handleTarget('ruby')} />
                    <Checkbox label="Go" onCheck={this.handleTarget('go')} disabled={true} />
                    <Checkbox label="PHP" onCheck={this.handleTarget('php')} />
                    <br />
                    <RaiseButton
                        label="Generate"
                        primary={true}
                        onTouchTap={this.handleGenerate}
                        icon={<FileDownload />}
                    />
                    <p>For the chosen language except JavaNano and Go, you need
                        <a href="https://github.com/google/protobuf/releases"> download </a>
                        and install corresponding runtime library.
                    </p>
                </div>
            </div>
        );
    }
}

export default Index;