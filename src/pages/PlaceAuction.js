import { useRef, useState } from 'react'
import { postData } from '../components/fetchData'
import PopupConfirmSubmit from '../components/PopupConfirmSubmit'
import { useNavigate } from 'react-router-dom'
import '../css/Payment.css'
import 'react-datepicker/dist/react-datepicker.css'

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Install plugin
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import ReactDatePicker from 'react-datepicker'

// Register the plugins
registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginImageTransform,
  FilePondPluginImageResize
)

const AuctionDetail = () => {
  const [auctionDetails, setAuctionDetails] = useState({
    productName: '',
    description: '',
    category: '',
    isOpenBid: false,
    startingPrice: '',
    endDate: new Date(),
    bidStep: '',
    expectedPrice: '',
    productPicture: [],
  })
  const uploadFileRef = useRef()
  const [modalShow, setModalShow] = useState(false)
  const navigate = useNavigate()

  // filter time
  const filterTime = (time) => {
    const currentDate = new Date()
    const selectedDate = new Date(time)

    return currentDate.getTime() + 3600 * 1000 < selectedDate.getTime()
  }

  // filter time
  const filterDate = (date) => {
    const currentDate = new Date()
    const selectedDate = new Date(date)

    return (
      currentDate.getTime() - 24 * 3600 * 1000 < selectedDate.getTime() &&
      currentDate.getTime() + 30 * 24 * 3600 * 1000 > selectedDate.getTime()
    )
  }

  const submitHandler = (event) => {
    const uploadedFile = uploadFileRef.current.getFiles()

    let auctionData = {
      ...auctionDetails,
      isOpenBid: auctionDetails.isOpenBid === 'open' ? true : false,
      startingPrice: Number(auctionDetails.startingPrice),
      endDate: String(new Date(auctionDetails.endDate).getTime()),
      productPicture: uploadedFile.map((f) => {
        return f.getFileEncodeDataURL()
      }),
    }

    if (auctionData.bidStep !== '') {
      auctionData.bidStep = Number(auctionData.bidStep)
    } else {
      delete auctionData.bidStep
    }
    if (auctionData.expectedPrice !== '') {
      auctionData.expectedPrice = Number(auctionData.expectedPrice)
    } else {
      delete auctionData.expectedPrice
    }

    postData('/auction/upload', JSON.stringify(auctionData)).then((res) => {
      // console.log(res)
      // console.log(JSON.stringify(auctionData))
      navigate(`/`)
    })
    // console.log(auctionData)
  }

  return (
    <div>
      <div className="header">Place Auction</div>
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
              maxlength="200"
              onChange={(e) =>
                setAuctionDetails({
                  ...auctionDetails,
                  productName: e.target.value,
                })
              }
              required
            />
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
              maxlength="3000"
              onChange={(e) =>
                setAuctionDetails({
                  ...auctionDetails,
                  description: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="form-input-field">
            <label htmlFor="itemCategory" className="form-label">
              ITEM CATEGORY
            </label>
            <select
              className="form-select form-control"
              onChange={(e) => {
                setAuctionDetails({
                  ...auctionDetails,
                  category: e.target.value,
                })
              }}
              defaultValue={''}
              required
            >
              <option value="" disabled>
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
                allowReorder={true}
                acceptedFileTypes={['image/png', 'image/jpeg']}
                imageResizeTargetWidth={1000}
                imageResizeTargetHeight={1000}
                imageResizeMode="contain"
                ref={uploadFileRef}
                credits={false}
                required
              />
              <div className="place-auction-upload-description">
                The first picture will be the main picture of this auction. You
                can drag the pictures to reorder them.
              </div>
            </div>
          </div>
        </div>
        <div className="form-heading1">AUCTION DETAILS</div>
        <div className="sub-form">
          <div className="form-input-field">
            <label htmlFor="startingPrice" className="form-label">
              STARTING PRICE
            </label>
            <div className="input-field-flex">
              <input
                type="number"
                className="form-control"
                placeholder="e.g. 500"
                min={1}
                onChange={(e) =>
                  setAuctionDetails({
                    ...auctionDetails,
                    startingPrice: e.target.value,
                  })
                }
                required
              />
              <div className="currency">
                <div>BAHT</div>
              </div>
            </div>
          </div>
          <div className="form-input-field">
            <label htmlFor="auctioningType">AUCTIONING TYPE</label>
            <div className="form-input-field auction-type-button">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="auctioningType"
                  value="closed"
                  id="closed-radio"
                  onChange={(e) =>
                    setAuctionDetails({
                      ...auctionDetails,
                      isOpenBid: e.target.value,
                    })
                  }
                  defaultChecked
                />
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
                  onChange={(e) =>
                    setAuctionDetails({
                      ...auctionDetails,
                      isOpenBid: e.target.value,
                    })
                  }
                />
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
            <ReactDatePicker
              className="form-control"
              selected={auctionDetails.endDate}
              onChange={(date) =>
                setAuctionDetails({
                  ...auctionDetails,
                  endDate: date,
                })
              }
              timeIntervals={10}
              showTimeSelect
              filterTime={filterTime}
              filterDate={filterDate}
              dateFormat="d MMMM yyyy HH:mm"
              timeFormat="HH:mm"
              required
            />
          </div>
          <div className="form-input-field">
            <label htmlFor="minimumBidStep" className="form-label">
              MINIMUM BID STEP (OPTIONAL)
            </label>
            <div className="input-field-flex">
              <input
                type="number"
                className="form-control"
                min={1}
                onChange={(e) =>
                  setAuctionDetails({
                    ...auctionDetails,
                    bidStep: e.target.value,
                  })
                }
                placeholder="e.g. 500"
              />
              <div className="currency">
                <div>BAHT</div>
              </div>
            </div>
          </div>
          <div className="form-input-field">
            <label htmlFor="expectedPrice" className="form-label">
              EXPECTED PRICE (OPTIONAL)
            </label>
            <div className="input-field-flex">
              <input
                type="number"
                className="form-control"
                min={1}
                placeholder="e.g. 500"
                onChange={(e) =>
                  setAuctionDetails({
                    ...auctionDetails,
                    expectedPrice: e.target.value,
                  })
                }
              />
              <div className="currency">
                <div>BAHT</div>
              </div>
            </div>
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
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => navigate(`/`)}
            >
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
