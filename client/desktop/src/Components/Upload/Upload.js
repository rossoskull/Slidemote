import React from 'react'

const Upload = ({ registerUpload }) => {

  let handleSubmit = e => {
    e.preventDefault()
    registerUpload(e.target['pdf'].files[0])
  }

  return (
    <div>
      <form id='file-upload' action='' onSubmit={handleSubmit}>
        <label for='pdf'>Upload PDF</label>
        <input type='file' name='pdf' accept='application/pdf' />
        <input type='submit' value='Upload' />
      </form>
    </div>
  )
}

export default Upload