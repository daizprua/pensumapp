import { Request, Response, NextFunction } from 'express';
import { LANGUAGES, Language } from '@school/config';

export interface LocalizedRequest extends Request {
  locale: Language;
}

export const localizationMiddleware = (
  req: LocalizedRequest,
  res: Response,
  next: NextFunction
) => {
  const acceptLanguage = req.headers['accept-language'];
  req.locale = acceptLanguage?.startsWith('es') ? LANGUAGES.ES : LANGUAGES.EN;
  next();
}; 