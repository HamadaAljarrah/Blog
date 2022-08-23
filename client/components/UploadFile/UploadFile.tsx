import React from 'react'

const UploadFile = ({ register }: any) => {
    return (
        <input {...register} type='file' />
    )
}

export default UploadFile