import { Compress } from "ReastorageInterface";
import {
  compress as lzCompress,
  decompress as lzDecompress,
  compressToUTF16,
  decompressFromUTF16,
} from "../lz-string";

export const handleCompress = (compress: Compress, isDecompress?: boolean) => {
  switch (compress) {
    case "utf-16":
      return isDecompress ? decompressFromUTF16 : compressToUTF16;
    case "default":
      return isDecompress ? lzDecompress : lzCompress;
    default:
      throw new Error("Invalid compress method");
  }
};
