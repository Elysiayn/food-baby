import React from 'react';
const firebase = require('firebase');
import FileUploader from 'react-firebase-file-uploader';

import { UPDATE_CURRENT_MENU_ITEM } from '../../utils/actions';
import { useStoreContext } from '../../utils/GlobalState';

const ImageUpload = () => {
    const [state, dispatch] = useStoreContext();

    const handleUploadError = error =>  console.log(error);

    const handleUploadSuccess = filename => {

        firebase
            .storage()
            .ref('images')
            .child(filename)
            .getDownloadURL()
            .then(url => dispatch({
                type: UPDATE_CURRENT_MENU_ITEM,
                itemPreview: {
                    ...state.itemPreview,
                    image: url
                }
            }));
    };

    return (
        <FileUploader
            accept='image/*'
            name='image'
            randomizeFilename
            storageRef={firebase.storage().ref('images')}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
        />
    );
};

export default ImageUpload;