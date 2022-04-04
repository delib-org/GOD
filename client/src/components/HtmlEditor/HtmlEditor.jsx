import React, { useState, useEffect, useRef } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import useDebounce from 'hooks/useDebounce'; // eslint-disable-line import/no-unresolved
import _ from 'lodash';
import './HtmlEditor.scss';

const getInitialDraftState = (html) => {
  if (_.isEmpty(html)) return EditorState.createEmpty();

  const blocksFromHtml = htmlToDraft(html);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  return EditorState.createWithContent(contentState);
};

export default function HTMLEditor(props) {
  const {
    html, onChange, tabIndex, ...editorProps // eslint-disable-line react/prop-types
  } = props;
  const [editorState, setEditorState] = useState(getInitialDraftState(html));

  const editorRef = useRef(null);

  const debouncedEditorState = useDebounce(editorState, 500);

  useEffect(
    () => {
      if (debouncedEditorState) {
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const markup = draftToHtml(rawContentState);
        onChange(markup);
      }
    },
    [debouncedEditorState],
  );

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div className="html-editor-container" role="textbox" onClick={() => editorRef.current.focusEditor()}>
        <Editor
          ref={editorRef}
          tabIndex={tabIndex || 0}
          {...editorProps}
                // editorRef={setEditorReference}
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={setEditorState}
          toolbar={{
            options: ['blockType', 'fontSize', 'fontFamily', 'inline', 'colorPicker', 'list', 'textAlign', 'link'],
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
          // history: { inDropdown: true },
          }}
        />
      </div>
    </>
  );
}
