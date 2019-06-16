import React from 'react';
import NavBar from './Components/NabBar/NavBar'
import Upload from './Components/Upload/Upload'
import Present from './Components/Present/Present'
import Remote from './Components/Remote/Remote'

import './App.css'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      file: null,
      filePath: null,
      currentPage: null,
      maxPages: null
    }
  }

  // Save the upload in the state
  registerUpload = file => {
    this.setState({
      file: file,
      filePath: URL.createObjectURL(file)
    }, () => {
      console.log(this.state)
    })
  }

  // Save maximum pages in the state
  onDocumentLoadSuccess = ({numPages}) => {
    this.setState({
      currentPage: 1,
      maxPages: numPages
    })
  }

  // Increment the page
  handlePageIncrease = () => {
		let { currentPage, maxPages } = this.state
		this.setState({
			currentPage:  currentPage % maxPages + 1
		})
	}

  // Decrement the page
	handlePageDecrease = () => {
		let { currentPage, maxPages } = this.state
		this.setState({
			currentPage: currentPage - 1 || maxPages
		})
	}

  render() {

    if (this.state.file) {
      // If file is uploaded
      // Render this section
      return (
        <div>
          <NavBar />
    
          <Present
            filePath={this.state.filePath}
            pageNumber={this.state.currentPage}
            onDocumentLoadSuccess={this.onDocumentLoadSuccess}
            handlePageDecrease={this.handlePageDecrease}
            handlePageIncrease={this.handlePageIncrease}
          />

          <Remote
            handlePageDecrease={this.handlePageDecrease}
            handlePageIncrease={this.handlePageIncrease}
          />
        </div>
      )

    } else {
      // Provide interface to upload file
      return (
        <div>
          <NavBar />
    
          <Upload registerUpload={this.registerUpload} />
        </div>
      )

    }   
  }  
}

export default App;
