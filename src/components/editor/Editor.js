import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-min-noconflict/mode-mysql';
import 'ace-builds/src-noconflict/theme-github';

const Editor = ({ setQuery, value, setValue }) => {
  const onChange = newValue => {
    setValue(newValue);
  };

  return (
    <main>
      <label htmlFor="editor" style={{ maxHeight: '300px' }}>
        <AceEditor
          id="editor"
          aria-label="editor"
          mode="mysql"
          name="editor"
          fontSize={16}
          minLines={28}
          maxLines={18}
          width="100%"
          showPrintMargin={false}
          showGutter
          placeholder="Write command here"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
          }}
          value={value}
          onChange={onChange}
          showLineNumbers
        />
      </label>
      <div>
        {/* <Button onClick={() => onSubmit()} iconName="fas fa-play">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <title id="run">run query</title>
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>{' '}
          Run Query
        </Button> */}
      </div>
    </main>
  );
};

export default Editor;
