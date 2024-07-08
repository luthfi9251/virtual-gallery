"use client";
import {
    Modal,
    ActionIcon,
    Menu,
    MenuDropdown,
    MenuItem,
    MenuTarget,
    Button,
    Stack,
} from "@mantine/core";
import { useMemo, forwardRef, useState, useRef } from "react";
import { FixedCropper, ImageRestriction } from "react-advanced-cropper";
import { PiCornersOut, PiRectangleDashed } from "react-icons/pi";
import { BsCheck } from "react-icons/bs";

const MenuSelectAspect = forwardRef((props, ref) => {
    const { aspect, setAspect } = props;
    return (
        <Menu position="top-start">
            <MenuTarget>{props.children}</MenuTarget>

            <MenuDropdown className="bg-black bg-opacity-60 text-white border-none">
                <MenuItem
                    leftSection={<PiRectangleDashed />}
                    rightSection={aspect === "1/1" && <BsCheck />}
                    onClick={() => setAspect("1/1")}
                    className="text-white hover:text-black"
                >
                    1 : 1
                </MenuItem>
                <MenuItem
                    leftSection={<PiRectangleDashed className=" rotate-90" />}
                    rightSection={aspect === "4/5" && <BsCheck />}
                    onClick={() => setAspect("4/5")}
                    className="text-white hover:text-black"
                >
                    4 : 5
                </MenuItem>
                <MenuItem
                    leftSection={<PiRectangleDashed />}
                    rightSection={aspect === "3/2" && <BsCheck />}
                    onClick={() => setAspect("3/2")}
                    className="text-white hover:text-black"
                >
                    3 : 2
                </MenuItem>

                {/* Other items ... */}
            </MenuDropdown>
        </Menu>
    );
});

export default function ModalCropperUnggah(props) {
    const cropperRef = useRef(null);
    const { opened, onClose, image, setImage, aspect, setAspect, setBlob } =
        props;
    const [localAspect, setLocalAspect] = useState(aspect);
    const aspectNumber = useMemo(() => {
        switch (localAspect) {
            case "1/1":
                return 1 / 1;
            case "4/5":
                return 4 / 5;
            case "3/2":
                return 3 / 2;
            default:
                return 1 / 1;
        }
    }, [localAspect]);

    const onCrop = () => {
        const cropper = cropperRef.current;
        if (cropper) {
            const canvas = cropper.getCanvas();
            canvas.toBlob((blob) => {
                if (blob) {
                    setBlob(blob);
                }
            }, "image/jpeg");
            setAspect(localAspect);
            setImage(canvas.toDataURL());
            onClose();
        }
    };
    return (
        <Modal opened={opened} onClose={onClose} centered size="auto">
            <Stack gap="md" className="h-full px-2">
                <div className="relative">
                    <FixedCropper
                        ref={cropperRef}
                        className="max-h-[500px] max-w-[500px] bg-black py-3 px-2"
                        src={image}
                        stencilProps={{
                            handlers: false,
                            lines: false,
                            movable: false,
                            resizable: false,
                            aspectRatio: aspectNumber,
                            grid: true,
                        }}
                        stencilSize={{
                            width: 400,
                            height: 400,
                        }}
                        imageRestriction={ImageRestriction.stencil}
                    />
                    <MenuSelectAspect
                        setAspect={setLocalAspect}
                        aspect={localAspect}
                    >
                        <ActionIcon
                            className="absolute bottom-2 left-2"
                            variant="filled"
                            color="rgba(20, 20, 20, 0.6)"
                            size="lg"
                            radius="xl"
                        >
                            <PiCornersOut
                                style={{ width: "60%", height: "60%" }}
                                stroke={1.5}
                            />
                        </ActionIcon>
                    </MenuSelectAspect>
                </div>
                <Button className=" self-center" onClick={onCrop}>
                    Simpan
                </Button>
            </Stack>
        </Modal>
    );
}
