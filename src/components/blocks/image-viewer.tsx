"use client";

import { toast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { CopyIcon, DownloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useState } from "react";

export function ImageViewer({ imageUrl }: { imageUrl: string }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const res = await fetch(
        `/image/download?url=${encodeURIComponent(imageUrl)}`,
        {
          method: "POST",
        }
      );
      const blob = await res.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      const format = res.headers.get("Content-Type")?.split("/")[1];
      a.download = `generated-image.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
      toast({
        title: "Download failed",
        description: "Failed to download the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopy = async () => {
    setIsCopying(true);
    try {
      const response = await fetch(
        `/image/download?url=${encodeURIComponent(imageUrl)}`,
        {
          method: "POST",
        }
      );
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);

      toast({
        title: "Image copied",
        description: "The image has been copied to your clipboard.",
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast({
        title: "Copy failed",
        description: "Failed to copy the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          <DownloadIcon className="w-4 h-4" />
          Download
        </Button>
        <Button variant="outline" onClick={handleCopy} disabled={isCopying}>
          <CopyIcon className="w-4 h-4" />
          Copy
        </Button>
      </div>
      <div className="flex justify-center p-10">
        <Image
          src={imageUrl}
          alt="Generated Image"
          width={256}
          height={256}
          unoptimized
        />
      </div>
    </div>
  );
}
