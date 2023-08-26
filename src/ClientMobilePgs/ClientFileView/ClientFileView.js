import React, { useEffect, useState } from 'react';
import style from "./ClientFileView.module.css";
import Swal from 'sweetalert2';
import { url_ } from '../../Config';
import { useLocation } from 'react-router-dom';

const ClientFileView = () => {

const  id  = useLocation().state.clientid;
  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');
  const  year  = useLocation().state.year;
 // console.log(year,id)
 
  const [codeVisible, setCodeVisible] = useState(false);
  const [fileResponse, setFileResponse] = useState(false);
  const [dbfilename, setDbfilename] = useState([]);
  const originalfilename = [
    "Acknowledgement",
    "Statement_of_Total_Income",
    "Balance_Sheet",
    "Profit_and_Loss",
    "26AS",
    "Tax_Challan",
    "Excel",
    "Others"
  ];

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      await getFile();
      await GetFileResponse();


    } catch (error) {
      console.error('An error occurred:', error);
    }
  };




  ////////////////////////////////////////////////////////////////////////////////////////////////

  //  Fetch file Code


  const getFile = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${url_}/getfile/${user_id}/${id}/${year}`, requestOptions);
      const data = await response.json();
      console.log(data)
      const extractedNames = data.map(file => {
        const fileid = file.id;
        const filePath = file.filePath;
        const parts = file.fileName.split(`${user_id}_${id}_${year}_`);
        const extractedName = parts[1].split('.pdf')[0];
        return { fileid, extractedName, filePath };
      });
      setDbfilename(extractedNames);

    } catch (error) {
      console.error('An error occurred while fetching files:', error);
    }
  };


  const filenameStatusArray = originalfilename.map(filename => {
    const matchingFile = dbfilename.find(file => {
      return file.extractedName === filename || file.fileid.toString() === filename;
    });

    if (matchingFile) {
      return { filename, status: true, fileId: matchingFile.fileid, filePath: matchingFile.filePath };
    } else {
      return { filename, status: false };
    }
  });










  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  //  Toggle Switch Code


  const GetFileResponse = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${url_}/getfilednotfiled/${user_id}/${id}/${year}`, requestOptions);
      const data = await response.json();
      if (data[0].filednotfiled === "No") {
        setFileResponse(false)
        console.log(data[0].filednotfiled)
      } else {
        setFileResponse(true)
      }

    } catch (error) {
      console.error('An error occurred while fetching files:', error);
    }
  };

  const handleToggle = async () => {
    if (fileResponse === true) {
      console.log("It's TRUE");
    } else {
      try {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, confirm!'
        });

        if (result.isConfirmed) {
          var myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${storedToken}`);

          var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow'
          };

          fetch(`${url_}/updateFiledNotFiled/${user_id}/${id}/${year}`, requestOptions)
            .then(response => console.log(response.status))
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
          window.location.reload();
        } else {
          console.log("Canceled the toggle!");
        }
      } catch (error) {
        console.log("Failed to call function!!!");

        console.log('Error:', error);
        if (error.response) {
          console.log('Response Status:', error.response.status);
          console.log('Response Data:', error.response.text());
        }
      }
    }
  };
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //  Select button code

  const toggleCodeVisibility = () => {
    setCodeVisible(!codeVisible);
  };


  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleCheckboxChange = (event, fileId) => {
    if (event.target.checked) {
      setSelectedFiles(prevSelectedFiles => [...prevSelectedFiles, fileId]);
    } else {
      setSelectedFiles(prevSelectedFiles => prevSelectedFiles.filter(id => id !== fileId));
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  
  

  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

  const openFileAndDownload = async (contentType, fileName, file_ID) => {
    try {
      const response = await fetch(`${url_}/openfile/${file_ID}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const arrayBuffer = await response.arrayBuffer();
      const fileBlob = new Blob([arrayBuffer], { type: `application/${contentType}` });
      const blobUrl = URL.createObjectURL(fileBlob);

      if (contentType === 'pdf') {
        setPdfBlobUrl(blobUrl);
        const pdfWindow = window.open(blobUrl, '_blank');
        pdfWindow.addEventListener('beforeunload', () => {
          URL.revokeObjectURL(blobUrl);
        });
      } else if (contentType === 'xlsx') {
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(blobUrl);
      }
    } catch (error) {
      console.error(`Error fetching or downloading ${contentType.toUpperCase()} file:`, error);
    }
  };




  /////////////////////////////////////////////////////////////////////////////////////////////////
  return (

    <div className="container">
      <div className="row m-5">
        <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9" id="maindiv">
          <div className="container">
            <div className="uphead">
              <div className="row">
                <div className="col">
                  <h1><b>Income Tax</b></h1>
                </div>
              {/*  <div className="col">

                  <label className={`${style.switch}`}>
                     <input type="checkbox" checked={fileResponse} onChange={handleToggle} />
                    <span className={`${style.slider} ${style.round}`}></span>
                  </label>  

                </div>*/}
              </div>
              <h6 className={`${style.headpara}`}>A.Y {year}</h6>
            </div>


            <div className={`${style.neckbar}`}>
              <div className="row">
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" id="select">
                  <button type="button" className="btn btn-danger" onClick={toggleCodeVisibility}>Select</button>
                </div>
                <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" id="delet">
                  <h2 className="icons">
                   {/*} {codeVisible && (
                      <i className="fa-solid fa-trash-can" onClick={DeleteFile}></i>
                    )}   */}
                  </h2>
                </div>
                <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" id="share">
                  <h2 className="icons">
                    {codeVisible && (
                      <i className="fa-solid fa-share-from-square" ></i>
                    )}
                  </h2>
                </div>
              </div>
            </div>
            <div className='container'>
              <div className="row m-4">



                {filenameStatusArray.map(item => (
                  <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' key={item.fileId}>
                    {item.status ? (
                      <div>

                        <div className={style.file_upload}>
                          {codeVisible && (
                            <label className={style.checkbox_label}>
                              <input
                                type="checkbox"
                                className={style.checkbox}
                                onChange={event => handleCheckboxChange(event, item.fileId)}
                              />
                              <span className={style.checkbox_custom}>
                                <span className={style.checkbox_tick}></span>
                              </span>
                            </label>
                          )}

                          {item.filename.toLowerCase().includes('excel') ? (
                            <i className="bi bi-file-earmark-excel-fill text-success" onDoubleClick={() => openFileAndDownload('xlsx', 'spreadsheet.xlsx', item.fileId)}></i>
                          ) : (
                            <i className="bi bi-file-earmark-pdf-fill text-danger" onDoubleClick={() => openFileAndDownload('pdf', 'document.pdf', item.fileId)}></i>
                          )}

                          <h6 className={style.filename_text} >
                            {item.filename}
                          </h6>
                        </div>
                      </div>


                    ) : (
                      <div >
                      </div>
                    )}
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </div>
    </div >

  );
}

export default ClientFileView;


