import { useState } from "react";

import {
  Button,
  Input,
  Modal,
  Loader,
} from "../components/ui";

function Showcase() {

  const [isOpen, setIsOpen] =
    useState(false);

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Component Showcase
      </h1>

      <div className="space-y-6">

        <Button variant="primary">
          Primary Button
        </Button>

        <Button variant="secondary">
          Secondary Button
        </Button>

        <Button variant="outline">
          Outline Button
        </Button>

        <Input
          label="Product Name"
          placeholder="Enter product name"
        />

        <Loader />

        <Button
          onClick={() =>
            setIsOpen(true)
          }
        >
          Open Modal
        </Button>

        <Modal
          isOpen={isOpen}
          onClose={() =>
            setIsOpen(false)
          }
          title="Sample Modal"
        >
          <p>
            Modal content here.
          </p>
        </Modal>

      </div>

    </div>
  );
}

export default Showcase;