const FileReaderMethodMap = {
  arrayBuffer: 'readAsArrayBuffer',
  binaryString: 'readAsBinaryString',
  dataURL: 'readAsDataURL',
  text: 'readAsText',
} as const;

type ReadType = keyof typeof FileReaderMethodMap;

/**
 *
 * 读取 Blob 或 File 对象，转为 Base64/String/ArrayBuffer
 * @param {Blob} blob   Blob 或 File 对象
 * @param {keyof typeof FileReaderMethodMap} [type='dataURL'] 转化的类型
 * @return {*}
 */
function fileReader(blob: Blob, type: 'arrayBuffer'): Promise<ArrayBuffer>;
function fileReader(
  blob: Blob,
  type?: Exclude<ReadType, 'arrayBuffer'>,
): Promise<string>;
function fileReader(
  blob: Blob,
  type: keyof typeof FileReaderMethodMap = 'dataURL',
) {
  let method = FileReaderMethodMap[type];
  if (!method) {
    method = FileReaderMethodMap.dataURL;
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader[method](blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default fileReader;
