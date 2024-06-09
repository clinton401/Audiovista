import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import avatar from "../assets/user (1).png";
import { useRef, useState, useEffect, useContext } from "react";
import Modals from "./Modals";
import LoaderMini from "./LoaderMini";
import { myContext } from "../App";
function EditPlaylistDetails({
  editPlaylistActiveHandler,
  imgUrl,
  name,
  playlistId,
  getPlaylist,
  setEditSuccessOrFail,
}) {
  const [fileData, setFileData] = useState({
    playlistImageFile: null,
    playlistImageError: null,
    playlistImageLoading: false,
  });
  const [formData, setFormData] = useState({
    formDataInputValue: "",
    formDataDescription: "",
    formDataError: null,
    formDataLoading: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [base64Image, setBase64Image] = useState(null)
  // const [textFocus]
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const { accessToken,  artistChange,
    setArtistChange, } = useContext(myContext);
  const { playlistImageFile, playlistImageError, playlistImageLoading } =
    fileData;
  const {
    formDataInputValue,
    formDataDescription,
    formDataError,
    formDataLoading,
  } = formData;
  const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      const maxSizeInBytes = 256 * 1024; 
      if (selectedFile) {
          if (selectedFile.size < maxSizeInBytes) {
              if (!selectedFile.type.startsWith("image/jpeg")) {
                  setBase64Image(null);
             setFileData({
               playlistImageFile: null,
               playlistImageError: "Please upload a valid JPEG file.",
             });
           } else {
                  const imgLocation = URL.createObjectURL(selectedFile);
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setBase64Image(reader.result.split(",")[1]); // Get the base64 string
                  };
                  reader.readAsDataURL(selectedFile);
             setFileData({
               playlistImageFile: imgLocation,
               playlistImageError: null,
             });
             //  playlistImageError(null);
             //  playlistImageFile(selectedFile);
           }
          } else {
                setFileData({
                  playlistImageFile: null,
                  playlistImageError: "File size exceeds 256KB",
                });
          }
      }
       
  };
  function closePage() {
    editPlaylistActiveHandler();
    setFormData({
      formDataInputValue: "",
      formDataDescription: "",
      formDataError: null,
      formDataLoading: false,
    });
    setFileData({
      playlistImageFile: null,
      playlistImageError: null,
      playlistImageLoading: false,
    });
  }
  const detailsData = {
    name: formDataInputValue,
    description: formDataDescription,
  };
  async function changeDetails() {
    try {
      setFormData({
        ...formData,
        formDataLoading: true,
      });

      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(detailsData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the playlist");
      } else {
        setEditSuccessOrFail(
          "Playlist updated successfully. Might take a while to reflect"
        );
        setTimeout(() => {
          getPlaylist();
          setArtistChange(!artistChange)
          //  window.location.reload();
        }, 60000);
        //    getPlaylist();
        //  window.location.reload();
        closePage();
      }
    } catch (error) {
      setFormData({
        ...formData,
        formDataError: error.message,
      });
      console.error(error);
    } finally {

      setFormData({
        ...formData,
        formDataLoading: false,
      });
    }
  }
    const imageData = {
      data: base64Image,
    };
  async function changeImage() {
    try {
      setFileData({
        ...fileData,
        playlistImageLoading: true,
      });

      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/images`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "image/jpeg",
          },
          body: base64Image,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the playlist image");
      } 
    } catch (error) {
      setFileData({
        ...fileData,
        playlistImageError: error.mesage,
      });
      console.error(error);
    } finally {
      setFileData({
        ...fileData,
        playlistImageLoading: false,
      });
    }
  }
// x

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  useEffect(() => {
    if (!playlistImageLoading && !formDataLoading) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [playlistImageLoading, formDataLoading]);
  useEffect(() => {
    if (name) {
      setFormData({
        ...formData,
        formDataInputValue: name,
      });
    }
  }, []);
  const handleDescriptionChange = ({ target }) => {
    if (target.value.length <= 400) {
      setFormData({
        ...formData,
        formDataDescription: target.value,
      });
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  function getSrc() {
    if (playlistImageFile) {
      return playlistImageFile;
    } else if (imgUrl) {
      return imgUrl;
    } else {
      return avatar;
    }
  }
  const imgSrc = getSrc();
  useEffect(() => {
    let timeoutId;

    if (playlistImageError || formDataError) {
      timeoutId = setTimeout(() => {
        setFileData({
          ...fileData,
          playlistImageError: null,
        });
        setFormData({
          ...formData,
          formDataError: null,
        });
      }, 3000);
    }

    // Clean up the timeout to avoid memory leaks
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [playlistImageError, formDataError]);

  function submitHandler(e) {
    e.preventDefault();

    if (formDataInputValue.length > 0) {
        changeDetails();
        if (playlistImageFile && base64Image) {
          changeImage();
        }
    }
  }
//   console.log(base64Image);

  return (
    <section
      className="flex items-center transition-all ease-in duration-300 py-10  ipad:right-5 justify-center px-[2.5%] z-[100]  top-0   fixed w-full h-dvh blurred overflow-x-hidden ipad:max-h-[900px] "
      onClick={closePage}
    >
      {playlistImageError && (
        <Modals text={playlistImageError} playlistPage={true} />
      )}
      {formDataError && <Modals text={formDataError} playlistPage={true} />}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[500px] bg-[#333333] flex flex-col gap-2 p-4 rounded-md"
      >
        <span className="flex justify-between gap-x-2 gap-y-4 items-center">
          <h2 className="text-xl font-bold ">Edit details</h2>
          <button
            className="w-[35px] aspect-square text-2xl rounded-md flex items-center justify-center "
            onClick={closePage}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </span>
        <form
          className="w-full flex justify-between gap-y-2 flex-wrap "
          onSubmit={submitHandler}
        >
          <div className="w-full sm:w-[38%] flex items-center justify-center">
            <button
              className="relative w-full aspect-square max-h-[200px] max-w-[200px] rounded-md "
              onClick={handleButtonClick}
              type="button"
            >
              <span className="blurred3 absolute top-0 left-0 w-full h-full gap-4 rounded-md flex-col flex items-center justify-center ">
                <FontAwesomeIcon icon={faPen} className="text-4xl" />
                <p className="text-lg">Choose photo </p>
              </span>
              <img
                // src={imgUrl ? imgUrl : avatar}
                src={imgSrc}
                alt={`${name} image`}
                className=" w-full aspect-square max-h-[200px] max-w-[200px] object-cover rounded-md "
              />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept=".jpeg, .jpg"
              onChange={handleFileChange}
            />
          </div>
          <div className="w-full sm:w-[58%]">
            <label htmlFor="name" className="   text-xs">
              Name
            </label>
            <input
              type="text"
              id="name"
              ref={inputRef}
              required
              value={formDataInputValue}
              onChange={({ target }) =>
                setFormData({
                  ...formData,
                  formDataInputValue: target.value,
                })
              }
              className="w-full text-sm bg-primary hover:bg-[#1a1a1a]  focus:bg-[#1a1a1a]  font-medium outline-none rounded-md p-2 "
            />

            <label htmlFor="description" className="   text-xs">
              Description
            </label>
            <textarea
              rows={6}
              style={{ resize: "none" }}
              name="description"
              onChange={handleDescriptionChange}
              value={formDataDescription}
              placeholder="Add an optional description"
              className="w-full text-xs bg-primary hover:bg-[#1a1a1a]  focus:bg-[#1a1a1a] outline-none rounded-md p-2"
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <button
              className="filter_btn edit font-medium flex items-center "
              type="submit"
            >
              Save {isLoading && <LoaderMini playlistPage={true} />}
            </button>
          </div>
          <p className="w-full text-xs text-center">
            By proceeding, you agree to give Spotify access to the image you
            choose to upload. Please make sure you have the right to upload the
            image.
          </p>
        </form>
      </div>
    </section>
  );
}

export default EditPlaylistDetails;
