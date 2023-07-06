import React, { useState } from "react"
import PillText from "../PillText/PillText"
import * as Dialog from '@radix-ui/react-dialog';
import * as Popover from '@radix-ui/react-popover';
import useResponsive from "../../../hooks/useResponsive";
import ConfettiExplosion from 'react-confetti-explosion';
import Button from "../Button/Button"
import "./DemoPage.css"
import "./Select.css"
import "./VideoDialog.css"

const DemoPage = () => {
  const { is440 } = useResponsive();
  const [optionType, setOptionType] = useState("Jade Lizard") // "Jade Lizard" | "Long Call" | "Long Strangle"
  const [optionMenuOpen, setOptionMenuOpen] = useState(false)
  const [isExploding, setIsExploding] = useState(false);

  const handleOptionTypeChange = (optionType) => {
    setOptionType(optionType)
    setOptionMenuOpen(false)
  }

  const explode = () => {
    setIsExploding(true);
    setTimeout(() => {
      setIsExploding(false);
    }, 2000);
  }

  const optionTypes = {
    "Long Call": {
      name: "Long Call",
      description: "Gives me right to purchase the asset for the strike price.",
      tags: ["Risky", "Put"]
    },
    "Jade Lizard": {
      name: "Jade Lizard",
      description: "A strategy used to buy while the market is down, very little downsides in case of exit.",
      tags: ["Defined-Risk"]
    },
    "Long Strangle": {
      name: "Long Strangle",
      description: "A nondirectional bet on a large price move",
      tags: ["Risky", "Call"]
    },
  }

  return (
    <div className="demo-page">
      {isExploding && <ConfettiExplosion width={4000}/>}
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
            {/* {!is440 &&
              <> */}
                <div>
                  Immerse yourself in a thrilling financial revolution powered by our integration with <PillText>Uniswap v3</PillText> - the reigning champion of Ethereum-based decentralized exchanges. Embrace complete autonomy with the ability to seamlessly swap assets and options, fully liquid, like never before.                  
                </div>
              {/* </>
            } */}
            {/* {is440 &&
              <>
                <div>
                  {`Swap assets and options fully liquidly powered by our integration, the `}
                  <PillText>Uniswap v3</PillText>
                  {` largest decentralized exchange on Ethereum`}
                </div>
              </>
            } */}
          </div>
          <div className="hovering-arrow-container">
            <img src={`/img/new-home-page/hovering-arrow.svg`} alt="hovering-arrow" className="hovering-arrow"/>
          </div>
        </div>
        <div className="demo-interactive">
          <div>
            <div className="demo-interactive-text">
              <span>{"Create a"}&#160;</span>
              <OptionsPopover 
                title={optionTypes[optionType].name} 
                handleOptionTypeChange={handleOptionTypeChange} 
                open={optionMenuOpen} 
                onOpenChange={setOptionMenuOpen}
              />
            </div>
            <img src={`/img/new-home-page/interactive-demo.png`}  alt="demo placeholder" />
            <Button className="explode-button" onClick={() => explode()}>Mint It!</Button>
            <div className="demo-interactive-details">
              <div className="demo-interactive-details-left">
                <div className="demo-interactive-details-title">{optionTypes[optionType].name}</div>
                <div className="demo-interactive-details-tags">
                  {optionTypes[optionType].tags.map((tag) => (
                    <PillText>{tag}</PillText>
                  ))}
                </div>
              </div>
              <div className="demo-interactive-details-right">
                {optionTypes[optionType].description}
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

const OptionsPopover = ({handleOptionTypeChange, title, onOpenChange, open}) => (
  <Popover.Root onOpenChange={onOpenChange} open={open}>
    <Popover.Trigger asChild>
      <div className="select-trigger">
        <span className="select-trigger-title">{title}</span>
        <img className="select-arrow" src={`/img/new-home-page/demo-dropdown-arrow.svg`}  alt="dropdown arrow" />
      </div>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className="PopoverContent" sideOffset={5}>

      <div className="select-item" onClick={() => handleOptionTypeChange("Long Call")}>
        <div className="select-item-image"></div>
        <div className="select-item-details">
          <div className="select-item-title">Long Call</div>
          <div className="select-item-subtitle">Gives me right to purchase the asset for the strike price.</div>
          <PillText className="pill">Defined Risk</PillText>
        </div>
      </div>

      <div className="select-item" onClick={() => handleOptionTypeChange("Jade Lizard")}>
        <div className="select-item-image"></div>
        <div className="select-item-details">
          <div className="select-item-title">Jade Lizard</div>
          <div className="select-item-subtitle">Unlimited risk on the downside, defined risk on the upside.</div>
          <PillText className="pill">Undefined Risk</PillText>
        </div>
      </div>

      <div className="select-item last-item" onClick={() => handleOptionTypeChange("Long Strangle")}>
        <div className="select-item-image"></div>
        <div className="select-item-details">
          <div className="select-item-title">Long Strangle</div>
          <div className="select-item-subtitle">A nondirectional bet on a large price move.</div>
          <PillText className="pill">Undefined Risk</PillText>
        </div>
      </div>

        <Popover.Close className="PopoverClose" aria-label="Close">
          {/* <Cross2Icon /> */}
        </Popover.Close>
        <Popover.Arrow className="PopoverArrow" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default DemoPage