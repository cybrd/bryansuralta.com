import { FunctionComponent, useState } from "react";
import { EditorState } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from "@draft-js-plugins/buttons";
import { stateToHTML } from "draft-js-export-html";
import "draft-js/dist/Draft.css";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";

import "./index.scss";
import { insert } from "../services/draft";

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;

export const Draft: FunctionComponent = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const html = () => {
    const htmlBody = stateToHTML(editorState.getCurrentContent());
    insert(htmlBody);
  };

  return (
    <div id="draft">
      <button onClick={html}>Save</button>
      <Toolbar>
        {(externalProps) => (
          <>
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            <UnorderedListButton {...externalProps} />
            <OrderedListButton {...externalProps} />
            <BlockquoteButton {...externalProps} />
            <CodeBlockButton {...externalProps} />
            <HeadlineOneButton {...externalProps} />
          </>
        )}
      </Toolbar>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        plugins={[toolbarPlugin]}
      />
    </div>
  );
};
