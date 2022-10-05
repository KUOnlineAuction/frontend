import { useRef, useState } from 'react'
import { postData } from '../components/fetchData'
import PopupConfirmSubmit from '../components/PopupConfirmSubmit'
import { useNavigate } from 'react-router-dom'

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Install plugin
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'

// Register the plugins
registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginImageCrop
)

const AuctionDetail = () => {
  const itemNameInputRef = useRef()
  const itemDetailsInputRef = useRef()
  const itemCategoryInputRef = useRef()
  const startingPriceInputRef = useRef()
  const minimumBidStepInputRef = useRef()
  const expectedPriceInputRef = useRef()
  const endDateInputRef = useRef()
  const uploadFileRef = useRef()
  const openBidInputRef = useRef()
  const [modalShow, setModalShow] = useState(false)
  const navigate = useNavigate()

  const submitHandler = (event) => {
    const enteredItemName = itemNameInputRef.current.value
    const enteredItemDetails = itemDetailsInputRef.current.value
    const enteredItemCategory = itemCategoryInputRef.current.value
    const enteredStartingPrice = startingPriceInputRef.current.value
    const enteredMinimumBidStep = minimumBidStepInputRef.current.value
    const enteredExpectedPrice = expectedPriceInputRef.current.value
    const enteredEndDate = endDateInputRef.current.value
    const uploadedFile = uploadFileRef.current.getFiles()
    const checkedIsOpenBid = openBidInputRef.current.checked

    let auctionData = {
      productName: enteredItemName,
      description: enteredItemDetails,
      category: enteredItemCategory,
      isOpenBid: checkedIsOpenBid,
      startingPrice: Number(enteredStartingPrice),
      endDate: String(new Date(enteredEndDate).getTime()),
      productPicture: uploadedFile.map((f) => {
        return f.getFileEncodeDataURL()
      }),
    }

    console.log(JSON.stringify(auctionData))

    if (enteredMinimumBidStep.length > 0) {
      auctionData.bidStep = Number(enteredMinimumBidStep)
    }
    if (enteredExpectedPrice.length > 0) {
      auctionData.expectedPrice = Number(enteredExpectedPrice)
    }

    postData('/auction/upload', JSON.stringify(auctionData)).then((res) => {
      console.log(res)
      console.log(JSON.stringify(auctionData))
      navigate(`/auction/${res.data.auctionID}`)
    })
  }

  return (
    <div>
      <h1 className="header">Place Auction</h1>
      <form
        className="place-auction-form"
        onSubmit={(event) => {
          setModalShow(true)
          event.preventDefault()
        }}
      >
        <div className="form-heading1">ITEM INFORMATION</div>
        <div className="sub-form">
          <div className="form-input-field">
            <label htmlFor="itemName" className="form-label">
              ITEM NAME
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. White fluffy bunny doll"
              ref={itemNameInputRef}
              required
            ></input>
          </div>
          <div className="form-input-field">
            <label htmlFor="itemDetail" className="form-label">
              ITEM DETAILS
            </label>
            <textarea
              type="text"
              className="form-control"
              rows="8"
              placeholder="e.g. White bunny with soft fur"
              ref={itemDetailsInputRef}
              required
            ></textarea>
          </div>
          <div className="form-input-field">
            <label htmlFor="itemCategory" className="form-label">
              ITEM CATEGORY
            </label>
            <select
              className="form-select form-control"
              ref={itemCategoryInputRef}
              defaultValue={'Select Category'}
              required
            >
              <option value="Select Category" disabled>
                Select Category
              </option>
              <option value="Home Improvement">Home Improvement</option>
              <option value="Jewellery">Jewellery</option>
              <option value="Coins, Currency, Stamps">
                Coins, Currency, Stamps
              </option>
              <option value="Watches">Watches</option>
              <option value="Fashion">Fashion</option>
              <option value="Arts">Arts</option>
              <option value="Antiques & Collectables and Amulet">
                Antiques & Collectables and Amulet
              </option>
              <option value="Electronics">Electronics</option>
              <option value="Cars & Automotive">Cars & Automotive</option>
              <option value="Handbags">Handbags</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
          </div>
          <div className="form-input-field">
            <label htmlFor="uploadPicture" className="form-label">
              UPLOAD PICTURE
            </label>
            <div className="form-input-field">
              <FilePond
                allowMultiple={true}
                maxFiles={10}
                allowFileEncode={true}
                acceptedFileTypes={['image/png', 'image/jpeg']}
                imageCropAspectRatio="1:1"
                ref={uploadFileRef}
                credits={false}
                required
              />
            </div>
          </div>
        </div>
        <div className="form-heading1">AUCTION DETAILS</div>
        <div className="sub-form">
          <div className="form-input-field">
            <label htmlFor="startingPrice" className="form-label">
              STARTING PRICE
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g. 500"
              min={1}
              ref={startingPriceInputRef}
              required
            ></input>
          </div>
          <div className="form-input-field">
            <label htmlFor="auctioningType">AUCTIONING TYPE</label>
            <div className="form-input-field">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="auctioningType"
                  value="closed"
                  id="closed-radio"
                  defaultChecked
                ></input>
                <label className="form-check-label" htmlFor="closed-radio">
                  Closed Bid
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="auctioningType"
                  value="open"
                  id="open-radio"
                  ref={openBidInputRef}
                ></input>
                <label className="form-check-label" htmlFor="open-radio">
                  Open Bid
                </label>
              </div>
            </div>
          </div>
          <div className="form-input-field">
            <label htmlFor="endDate" className="form-label">
              END DATE
            </label>
            <input
              type="datetime-local"
              className="form-control"
              ref={endDateInputRef}
              required
            ></input>
          </div>
          <div className="form-input-field">
            <label htmlFor="minimumBidStep" className="form-label">
              MINIMUM BID STEP (OPTIONAL)
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g. 500"
              min={1}
              ref={minimumBidStepInputRef}
            ></input>
          </div>
          <div className="form-input-field">
            <label htmlFor="expectedPrice" className="form-label">
              EXPECTED PRICE (OPTIONAL)
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g. 500"
              min={1}
              ref={expectedPriceInputRef}
            ></input>
          </div>
        </div>
        <div className="form-footer">
          <div className="attention">
            IMPORTANT NOTE: BIDDING FEES WILL BE CALCULATED AFTER THE BIDDING
            TIME ENDS
          </div>
          <div>
            By clicking Place Auction below, you agree to our Terms of Service
            and our Privacy Policy.
          </div>
          <div>
            <button type="submit" className="btn btn-primary first-button">
              Place Auction
            </button>
            <button type="button" className="btn btn-outline-primary">
              Cancel
            </button>
          </div>
        </div>
      </form>
      <PopupConfirmSubmit
        modalShow={modalShow}
        submitHandler={submitHandler}
        setModalShow={setModalShow}
      />
    </div>
  )
}
export default AuctionDetail
