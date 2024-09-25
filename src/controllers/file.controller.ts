import { Request, Response } from 'express';

export const uploadImageS3 = async (req: any, res: Response) => {
  try {
    const fileUrl = req.file.location;
    res.status(200).json({ status: 'success', fileUrl: fileUrl });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: (err as Error).message });
  }
};
