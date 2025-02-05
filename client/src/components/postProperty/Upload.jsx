import React, { useState } from 'react';
import { BsUpload } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { contentIntroduction } from "@/ultils/Content";
import { CiImageOn } from "react-icons/ci";
import { UploadImageRequest } from '@/api/UploadMultiImage';

const Upload = ({value, setValue}) => {


    const handleImage = async (e) => {
        e.preventDefault(); // Ngăn hành vi mặc định
        const files = e.target.files;
        const formDataArray = Array.from(files).map((file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET); // Sửa key
            return formData;
        });

        try {
            // Upload tất cả ảnh cùng lúc
            const uploadPromises = formDataArray.map((formData) => UploadImageRequest(formData));
            const responses = await Promise.all(uploadPromises);

            // Lấy URL từ kết quả trả về
            const urls = responses.map((response) => response.data.secure_url);
            setValue((prevUrls) => [...prevUrls, ...urls]); // Lưu URL vào state
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };

    return (
        <div className="w-[50%] justify-center items-center">
            <span className="text-xl font-semibold">Hình ảnh</span>
            <div className="w-full">
                <label
                    className="flex flex-col w-full gap-3 justify-center items-center h-[300px] border-2 border-dashed border-gray"
                    htmlFor="picture"
                >
                    Hình ảnh
                    <BsUpload size={50} color="stone-500" />
                </label>
                <input hidden id="picture" type="file" multiple onChange={handleImage} />
            </div>

            {/* Hiển thị URL ảnh đã upload */}
            {value.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Uploaded Images:</h3>
                    <ul className="list-disc pl-5">
                        {value.map((url, index) => (
                            <li key={index}>
                                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                    {url}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="hover: no-underline">
                        <CiImageOn size={30} />
                        <span className="text-md">Hướng dẫn đăng ảnh thường</span>
                    </AccordionTrigger>
                    <AccordionContent className="bg-stone-300 p-6 rounded-md">
                        {contentIntroduction.map((it) => (
                            <p className="flex gap-3 items-center" key={it.id}>
                                <GoDotFill /> {it.content}
                            </p>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default Upload;
