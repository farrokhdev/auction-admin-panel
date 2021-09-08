import React , {Component} from 'react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditor } from '@ckeditor/ckeditor5-react';


class TextEditor extends Component {
    editor = null ;






    render() {
        return (
            <React.Fragment>
                <h2>CKEditor 5 using a custom build - decoupled editor</h2>
                <CKEditor
                    onReady={ editor => {
                        console.log( 'Editor is ready to use!', editor );

                        // Insert the toolbar before the editable area.
                        editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                        );

                        this.editor = editor;
                    } }
                    onError={ ( { willEditorRestart } ) => {
                        // If the editor is restarted, the toolbar element will be created once again.
                        // The `onReady` callback will be called again and the new toolbar will be added.
                        // This is why you need to remove the older toolbar.
                        if ( willEditorRestart ) {
                            this.editor.ui.view.toolbar.element.remove();
                        }
                    } }
                    onChange={ ( event, editor ) => console.log(  editor.getData() ) }
                    editor={ DecoupledEditor }
                    data="<p>Hello from CKEditor 5's decoupled editor!</p>"
                    // config={  }
                />

            </React.Fragment>
        );
    }
}


export default TextEditor;
