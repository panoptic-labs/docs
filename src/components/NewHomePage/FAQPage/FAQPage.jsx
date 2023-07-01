import React from "react"
import * as Accordion from '@radix-ui/react-accordion';
import Button from "../Button/Button";
import "./FAQPage.css"

const FAQPage = () => {

  const content = "Lorem ipsum dolor sit amet consectetur. Faucibus ultricies sed neque id et. Consequat id maecenas in vitae. Donec curabitur scelerisque ut pellentesque odio amet at. Eu justo venenatis gravida cursus non turpis. Et eu sem gravida et quam eget aliquam malesuada. Aliquam molestie quisque morbi at vestibulum. Eu ut elementum erat viverra cursus orci. Aliquam quam sed sed quis eget hendrerit sit. Suspendisse tristique bibendum mauris ligula adipiscing donec mauris. Urna suspendisse malesuada sit neque vitae dis tortor elit vitae."

  return (
    <div className="faq-page">
      <div className="faq-content">
        <div className="faq-title">
          Frequently Asked Questions
        </div>
        <div className="faq-accordion">
          <Accordion.Root className="accordion-root" type="single" defaultValue="item-1" collapsible>
            <Accordion.Item className="accordion-item" value="item-1">
              <AccordionTrigger className="first-trigger">What is Panoptic?</AccordionTrigger>
              <AccordionContent>{content}</AccordionContent>
            </Accordion.Item>
            <Accordion.Item className="accordion-item" value="item-2">
            <AccordionTrigger>How do I use Panoptic?</AccordionTrigger>
              <AccordionContent>{content}</AccordionContent>
            </Accordion.Item>
            <Accordion.Item className="accordion-item" value="item-3">
              <AccordionTrigger>What are the key benefits?</AccordionTrigger>
              <AccordionContent>{content}</AccordionContent>
            </Accordion.Item>
            <Accordion.Item className="accordion-item" value="item-4">
            <AccordionTrigger>Which assets can I trade?</AccordionTrigger>
              <AccordionContent>{content}</AccordionContent>
            </Accordion.Item>
            <Accordion.Item className="accordion-item" value="item-5">
              <AccordionTrigger>What does it cost to trade?</AccordionTrigger>
              <AccordionContent>{content}</AccordionContent>
            </Accordion.Item>
          </Accordion.Root>
        </div>
        <div className="faq-button-container">
          <Button>More Questions?</Button>
        </div>
      </div>

    </div>
  )
};

const AccordionTrigger = ({children, className}) => (
  <Accordion.Header className="accordion-header">
    <Accordion.Trigger className={`accordion-trigger ${className}`}>
      {children}
      <div className="faq-arrow-container">
        <img src={`/img/new-home-page/faq-arrow.svg`} alt="faq-arrow" className="faq-arrow"/>
      </div>
    </Accordion.Trigger>
  </Accordion.Header>
);

const AccordionContent = ({children}) => (
  <Accordion.Content className="accordion-content">
    <div className="accordion-content-text">
      {children}
    </div>
  </Accordion.Content>
);

export default FAQPage