import React, { useState, createRef } from 'react';
import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'codemirror/lib/codemirror.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'highlight.js/styles/github.css';

const EditorPage: React.FC = () => {
    const [currentContents, setCurrentContents] = useState<string>('');
    const editorRef = createRef<any>();

    const onClickSave = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getInstance().getHtml());
        }
    };

    const onChange = () => {
        const contents =
            editorRef.current && editorRef.current.getInstance().getHtml();

        setCurrentContents(contents);
    };

    return (
        <Container>
            <Contents>
                <EditorLayout>
                    <Editor
                        initialEditType={'wysiwyg'}
                        plugins={[colorSyntax, codeSyntaxHighlight]}
                        ref={editorRef}
                        height={'500px'}
                        usageStatistics={false}
                        onChange={onChange}
                    />
                </EditorLayout>
                <PreviewLayout
                    dangerouslySetInnerHTML={{
                        __html: currentContents,
                    }}
                />
            </Contents>
            <SaveButton onClick={onClickSave}>저장</SaveButton>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 100px;
`;

const Contents = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const EditorLayout = styled.div`
    flex: 0 0 50%;
    height: 500px;
    margin-right: 40px;

    .tui-editor-defaultUI {
        b {
            font-weight: bold;
        }
    }
`;

const PreviewLayout = styled.div`
    flex: 0 0 50%;
    height: 500px;
    border: 1px solid #e9edf1;
    padding: 16px 25px 0px 25px;
    overflow-y: auto;

    p ~ p {
        margin-top: 17.6px;
    }
`;

const SaveButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 36px;
    background: #1890ff;
    border-radius: 2px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    margin: 32px 0 0 auto;
`;

export default EditorPage;
