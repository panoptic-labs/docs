import React, { useRef, useState, useEffect } from "react"
import PillText from "../PillText/PillText"
import * as Dialog from '@radix-ui/react-dialog';
import * as Popover from '@radix-ui/react-popover';
import useResponsive from "../../../hooks/useResponsive";
import DemoChart from "../DemoChart/DemoChart"
import ConfettiExplosion from 'react-confetti-explosion';
import Button from "../Button/Button"
import { LongCall } from "./long-call";
import { LongStrangle } from "./long-strangle";
import { JadeLizard } from "./jade-lizard";
import "./DemoPage.css"
import "./Select.css"
import "./VideoDialog.css"

const DemoPage = () => {
  const demoInteractiveRef = useRef(null);
  const { is440 } = useResponsive();
  const [optionType, setOptionType] = useState("Jade Lizard") // "Jade Lizard" | "Long Call" | "Long Strangle"
  const [optionMenuOpen, setOptionMenuOpen] = useState(false)
  const [isExploding, setIsExploding] = useState(false);
  const [showReciept, setShowReciept] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      const { width, height } = demoInteractiveRef.current.getBoundingClientRect();
      setChartSize({ width, height });
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOptionTypeChange = (optionType) => {
    setOptionType(optionType)
    setOptionMenuOpen(false)
  }

  const mint = () => {
    setShowConfirm(true)
  }

  const confirm = () => {
    setIsExploding(true);
    setShowConfirm(false)
    setShowReciept(true)
    setTimeout(() => {
      setIsExploding(false);
    }, 2000);
  }

  const mintAnother = () => {
    setShowReciept(false)
  }

  const optionTypes = {
    "Long Call": {
      name: "Long Call",
      description: "Gives me right to purchase the asset for the strike price.",
      tags: ["Defined Risk"],
      image: "demo-graph-1",
    },
    "Jade Lizard": {
      name: "Jade Lizard",
      description: "Unlimited risk on the downside, defined risk on the upside.",
      tags: ["Undefined Risk"],
      image: "demo-graph-2",
    },
    "Long Strangle": {
      name: "Long Strangle",
      description: "A nondirectional bet on a large price move (up or down).",
      tags: ["Defined Risk"],
      image: "demo-graph-3",
    },
  }

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
            Immerse yourself in a thrilling financial revolution powered by our integration with <PillText>Uniswap v3</PillText> - the reigning champion of Ethereum-based decentralized exchanges. Embrace complete autonomy with the ability to seamlessly swap assets and options, fully liquid, like never before.                  
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
            <div className="demo-interactive-body" ref={demoInteractiveRef}>
            {isExploding && <ConfettiExplosion width={4000}/>}
              <DemoChart optionType={optionTypes[optionType].name} chartSize={chartSize}/>
              {/* <img src={`/img/new-home-page/${optionTypes[optionType].image}.svg`} className={showReciept || showConfirm ? 'demo-greyed-out demo-graph' : 'demo-graph'} alt="demo placeholder" /> */}
              {showReciept && 
                <div className="demo-interactive-reciept">
                  <div className="receipt-container">
                    <img src={`/img/new-home-page/receipt-checkmark.svg`} className="receipt-checkmark" alt="Check Mark" />
                    <div className="receipt-title">Option Minted on Chain!</div>
                    <div className="reciept-flex">
                      <div className="receipt-subtitle">ETH/DAI</div>
                      <div className="receipt-subtitle">30bps</div>
                      <div className="receipt-subtitle">0x0359087578839</div>
                    </div>
                    <div className="reciept-flex">
                      <div>
                        <div className="reciept-detail-title">Network</div>
                        <div className="reciept-detail">Ethereum</div>
                      </div>
                      <div>
                        <div className="reciept-detail-title">Network Fee</div>
                        <div className="reciept-detail">.0000014 ETH</div>
                      </div>
                    </div>
                    <Button onClick={() => mintAnother()}>Mint another option!</Button>
                    <div className="receipt-note">
                      Note: this demo is for informational purposes only, no real funds are used
                    </div>
                  </div>
                </div>
              }
              {showConfirm && 
                <div className="demo-interactive-reciept">
                  <div className="receipt-container">
                    <button className="confirm-close-button" onClick={() => setShowConfirm(false)}>
                      <img src="/img/icons/close.svg" alt="close" />
                    </button>
                    <div className="receipt-title">New Position</div>
                    <div className="demo-confirm-label">
                      <img src="/img/coins/eth.png" className="demo-label-coin coin-eth" alt="eth" />
                      <img src="/img/coins/dai.png" className="demo-label-coin coin-dai" alt="eth" />
                      <span className="demo-label-pair">ETH</span>
                      <span className="demo-label-pair">/</span>
                      <span className="demo-label-pair">DAI</span>
                      <div className="demo-label-basis-points">30bps</div>
                    </div>
                    <div className="reciept-flex">
                      <div>
                        <div className="reciept-detail-title"># of Contracts</div>
                        <div className="reciept-detail">138,982</div>
                      </div>
                      <div>
                        <div className="reciept-detail-title">Fee Tier</div>
                        <div className="reciept-detail">1 week</div>
                      </div>
                    </div>
                    <div className="reciept-flex">
                      <div>
                        <div className="reciept-detail-title">P/L Open</div>
                        <div className="reciept-detail">$988,476</div>
                      </div>
                      <div>
                        <div className="reciept-detail-title">Collateral Req.</div>
                        <div className="reciept-detail">$723,251</div>
                      </div>
                    </div>
                    <Button onClick={() => confirm()}>Confirm Mint</Button>
                    <div className="receipt-note">
                      Note: this demo is for informational purposes only, no real funds are used
                    </div>
                  </div>
                </div>
              }
              {!showReciept && !showConfirm && 
                <>
                  <div className="demo-interactive-label">
                    <img src="/img/coins/eth.png" className="demo-label-coin coin-eth" alt="eth" />
                    <img src="/img/coins/dai.png" className="demo-label-coin coin-dai" alt="eth" />
                    <span className="demo-label-pair">ETH</span>
                    <span className="demo-label-pair">/</span>
                    <span className="demo-label-pair">DAI</span>
                    <div className="demo-label-basis-points">30bps</div>
                  </div>
                  <Button className="explode-button" onClick={() => mint()}>Mint It!</Button>
                </>
              }
            </div>
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
        <div className="select-item-image">
          <LongCall/>
        </div>
        <div className="select-item-details">
          <div className="select-item-title">Long Call</div>
          <div className="select-item-subtitle">Gives me right to purchase the asset for the strike price.</div>
          <PillText className="pill">Defined Risk</PillText>
        </div>
      </div>

      <div className="select-item" onClick={() => handleOptionTypeChange("Jade Lizard")}>
        <div className="select-item-image">
          <JadeLizard/>
        </div>
        <div className="select-item-details">
          <div className="select-item-title">Jade Lizard</div>
          <div className="select-item-subtitle">Unlimited risk on the downside, defined risk on the upside.</div>
          <PillText className="pill">Undefined Risk</PillText>
        </div>
      </div>

      <div className="select-item last-item" onClick={() => handleOptionTypeChange("Long Strangle")}>
        <div className="select-item-image">
          <LongStrangle/>
        </div>
        <div className="select-item-details">
          <div className="select-item-title">Long Strangle</div>
          <div className="select-item-subtitle">A nondirectional bet on a large price move (up or down).</div>
          <PillText className="pill">Defined Risk</PillText>
        </div>
      </div>
        <Popover.Arrow className="PopoverArrow" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default DemoPage