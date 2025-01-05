import React from "react";

export default function Faq() {
  const accordionData: any = [
    {
      id: 0,
      question: "Click to open this one and close others",
      answer: "hello",
    },
    {
      id: 1,
      question: "Click to open this one and close others",
      answer:
        "Frequently Asked Questions Frequently Asked Questions Frequently Asked Questions Frequently Asked Questions Frequently Asked Questions Frequently Asked Questions Frequently Asked Questions",
    },
    {
      id: 2,
      question: "Click to open this one and close others",
      answer:
        "Frequently Asked Questions Frequently Asked Questions Frequently Asked Questions Frequently Asked Questions Frequently Asked Questions Frequently Asked Questions Frequently Asked Questions",
    },
    {
      id: 3,
      question: "Click to open this one and close others",
      answer:
        "Frequently Asked Questions Frequently Asked Questions Frequently Asked Questions Frequently Asked Questions Frequently Asked Questions Frequently Asked Questions Frequently Asked Questions",
    },
    {
      id: 4,
      question: "Click to open this one and close others",
      answer:
        "Frequently Asked Questions Frequently Asked Questions Frequently Asked Questions Frequently Asked Questions Frequently Asked Questions Frequently Asked Questions Frequently Asked Questions",
    },
  ];
  return (
    <section className="bg-base-200">
      <div className="lg:py-48 py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="sm:text-4xl text-3xl font-extrabold text-base-content mb-8">
            Frequently Asked Questions
          </p>
          <div className="text-base-content/80">
            Have another question? Contact me on
            <a
              className="link text-base-content mx-1"
              target="_blank"
              href="https://twitter.com/marc_louvion"
            >
              Twitter
            </a>
            or by
            <a
              href="mailto:marc@shipfa.st"
              target="_blank"
              className="link text-base-content ml-1"
            >
              email
            </a>
            .
          </div>
        </div>
        <ul className="basis-1/2">
          {accordionData.map((acc: any, idx: number) => {
            return (
              <div key={idx} className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                  {acc.question}
                </div>
                <div className="collapse-content text-primary">
                  <p> {acc.answer} </p>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
