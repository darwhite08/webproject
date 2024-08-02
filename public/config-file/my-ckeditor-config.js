import { ClassicEditor, Essentials, Bold, Italic, Font, Paragraph } from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [ Essentials, Bold, Italic, Font, Paragraph ],
        toolbar: {
            items: [
                'undo', 'redo', '|', 'bold', 'italic', '|',
                'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor'
            ]
        }
    } )
    .then( /* ... */ )
    .catch( /* ... */ );
