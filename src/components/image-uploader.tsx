import React from 'react'
import styled from 'styled-components'
import IconButton from './icon-button'

const ImageUploader: React.FC<{
    id: string,
    image: string,
    imageClass?: string,
    defaultImage: string,
    alt?: string,
    onUpload: () => void,
    onDelete: (defaultImage: string) => void,
    imgHeight: string,
    imgWidth: string
}> = ({
    id,
    image,
    imageClass,
    defaultImage,
    alt,
    onUpload,
    onDelete,
    imgHeight,
    imgWidth
}) => {

    return (
        <StyledUploader>
            <img 
                className={imageClass ? imageClass : ''} 
                src={image ? image : defaultImage} 
                alt={alt} 
                height={imgHeight}
                width={imgWidth}
            />
            <input 
                id={id}
                type="file" 
                accept="image/png, image/jpeg" 
                multiple={false}
                onChange={() => onUpload()}
            />
            <ImageActions className="card-text">
                <label id="uploadFolder" htmlFor={id} className="btn btn-primary">
                    <i className="fas fa-folder-open" />
                </label>
                <IconButton 
                    iconClass={"fas fa-trash"} 
                    buttonClass={"btn btn-danger"}
                    onClick={() => onDelete(defaultImage)}
                />
            </ImageActions>
        </StyledUploader>
    )
}

export default ImageUploader

const StyledUploader = styled.div`
    #uploadFolder {
        cursor: pointer;
    }

    input {
        display: none;
    }
`

const ImageActions = styled.div`
    margin-top: 10px;

    text-align: center;

    .btn-primary {
        margin-right: 15px;
    }
`
