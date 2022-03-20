//Code editor (using react-ace editor)

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
  
      </div>
    </main>
  );
};

export default Editor;