import React from "react";
import "./VerticalsSection.css";
import LiquidityIcon from "../../icons/LiquidityIcon";
import PerpetualsIcon from "../../icons/PerpetualsIcon";
import OptionsIcon from "../../icons/OptionsIcon";
import PanoptimistsIcon from "../../icons/PanoptimistsIcon";

export default function VerticalsSection() {
  return (
    <div className="verticals-section container mx-auto text-center py-20 flex flex-col gap-y-6">
      <h2>A suite of tools designed for the entire DeFi community, no matter your strategy.</h2>
      <p className="max-w-5xl mx-auto" >Unlock the full potential of decentralized finance with our comprehensive suite of tools. Catering to a wide range of strategies and roles within the DeFi ecosystem, we provide advanced solutions for trading, liquidity provision, and risk management.</p>
      <div className="flex flex-col md:flex-row gap-x-6 gap-y-6">
        <Card
          icon={<LiquidityIcon />}
          title="Uniswap Liquidity Providers"
          description="Increased yield, impermanent loss (IL) mitigation, advanced strategies, and risk management"
        />
        <Card
          icon={<PerpetualsIcon />}
          title="Perps Traders"
          description="Trade any token permissionlessly with leverage, capped downside, no liquidation risk, and no expiries in the non-custodial, oracle-free options platform."
        />
        <Card
          icon={<OptionsIcon />}
          title="Options Traders"
          description="A full-featured options trading platform – buy and sell capital-efficient, multi-legged options strategies on any token at any strike price."
        />
        <Card
          icon={<PanoptimistsIcon />}
          title="Panoptimists"
          description="A robust online community of Panoptimists who value innovative advancements in blockchain, Decentralized Finance (DeFi), and financial instruments."
        />
      </div>

      {/* TODO: Add email */}
      {/* <div className="text-center mt-6 p-4">
        <p>Looking to be an Enterprise Partner?</p>
        <a href="#" className="text-blue-500 hover:underline">
          Schedule a meeting →
        </a>
      </div> */}
    </div>
  )
}


type CardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title, description, icon }) => (
    <div onClick={() => window.location.href="/blog"} className="group p-4 flex flex-col justify-between shadow-lg text-left flex-1 rounded-xl border-2 border-gray-300 hover:cursor-pointer  hover:bg-panoptic-purple hover:text-white">
      <div>
        <div className="w-16 h-16 p-2 flex items-center justify-center group-hover:text-white text-panoptic-purple hover:text-white ">
          {icon}
        </div>
        <h2 className="text-2xl font-bold mt-2">{title}</h2>
        <p className="mt-2">{description}</p>
      </div>
      <div>
        Read more →
      </div>
    </div>
);