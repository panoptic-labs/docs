import React from "react"
import PillText from "../PillText/PillText"
import * as Select from '@radix-ui/react-select';
import * as Dialog from '@radix-ui/react-dialog';
import "./DemoPage.css"

const DemoPage = () => {

  return (
    <div className="demo-page">
      <div className="demo-flex">
        <div className="demo-text">
          <PillText>Streamlined Trading</PillText>
          <div className="demo-title">
            <div>Panoptic App</div>
            <div>puts you in the</div>
            <div>Control Center</div>
          </div>
          <div className="demo-subtitle">
            <div>
              enabling both 
              <span className="text-green"> out-of-the-</span>
            </div>
            <div>
              <span className="text-green">box ease</span>
              {` AND `}
              <span className="text-purple">power-user</span>
            </div>
            <div className="text-purple">performance.</div>
          </div>
          <div className="demo-details">
            <div>
              {`Swap assets and options fully liquidly powered by our integration, the `}
              <PillText>Uniswap v3</PillText>
            </div>
            <div>largest decentralized exchange on Ethereum</div>
          </div>
          <div className="hovering-arrow-container">
            <img src={`/img/new-home-page/hovering-arrow.svg`} alt="hovering-arrow" className="hovering-arrow"/>
          </div>
        </div>
        <div className="demo-interactive">
          <div>
            <div className="demo-interactive-text">
              Create a 
              <OptionSelect></OptionSelect>
              {/* Jade Lizard */}
            </div>
            <img src={`/img/new-home-page/demo-placeholder.png`}  alt="demo placeholder" />
            <div className="demo-interactive-details">
              <div className="demo-interactive-details-left">
                <div className="demo-interactive-details-title">Jade Lizard</div>
                <div className="demo-interactive-details-tags">
                  <div className="demo-interactive-details-tags-first">
                    <PillText>Risky</PillText>
                  </div>
                  <PillText>Put</PillText>
                </div>
              </div>
              <div className="demo-interactive-details-right">
                A strategy used to buy while the market is down, very little downsides in case of exit.
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <div className="demo-video">
        <div className="video-text">Just watch the Demo</div>
        <VideoDialog trigger={
          <div className="play-button">
            PLAY
          </div>
        }></VideoDialog>
        <img src={`/img/new-home-page/video-thumbnail.png`} alt="video-thumbnail" className="video-thumbnail"/>
      </div>

    </div>
  )
}

import "./Select.css"
const OptionSelect = () => (
  <Select.Root>
    <Select.Trigger className="select-trigger" aria-label="Food">
      <Select.Value placeholder="Jade Lizard" />
      <Select.Icon className="SelectIcon">
        {/* <ChevronDownIcon /> */}
        <img src={`/img/new-home-page/demo-dropdown-arrow.svg`}  alt="dropdown arrow" />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="select-content">
        <Select.Viewport className="SelectViewport">
          <Select.Group>
            <SelectItem value="Long Call">
              
            </SelectItem>
            <SelectItem value="Jade Lizard">Jade Lizard</SelectItem>
            <SelectItem value="Long Strangle">Long Strangle</SelectItem>
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

const SelectItem = ({ children }) => (
  <Select.Item className="SelectItem">
    <Select.ItemText>f</Select.ItemText>
      <div className="select-item">
        <div className="select-item-image"></div>
        <div>
          <div className="select-item-title">Long Call</div>
          <div className="select-item-subtitle">Gives me right to purchase the asset for the strike price.</div>
          <PillText>Undefined Risk</PillText>
        </div>
      </div>
    <Select.ItemIndicator className="SelectItemIndicator">
      {/* <CheckIcon /> */}g
    </Select.ItemIndicator>
  </Select.Item>
);

import "./VideoDialog.css"
const VideoDialog = ({trigger}) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      {trigger}
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="dialog-overlay" />
      <Dialog.Content className="dialog-content">
        <video src="https://user-images.githubusercontent.com/62954565/223510059-8c057bc5-3957-466d-bbdd-27e2bdea02bb.mp4#t=0.55" preload="metadata" type="video/mp4" width="100%" height="auto" autoPlay controls></video>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DemoPage