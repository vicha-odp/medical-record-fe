import clsx from 'clsx';
import parseHtml from 'html-react-parser';

const Text = ({ tag, value, className, children, id }: ITextProps) => {
  const stringHtml = `
    <${tag}
      id='${id}'
      className='${clsx(className)}'
    >${value || children}</${tag}}>
  `;
  return <>{parseHtml(stringHtml)}</>;
};

export interface ITextProps {
  value?: string | number;
  tag?:
    | 'div'
    | 'p'
    | 'span'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'label'
    | 'li';
  /**
   * Text color
   */
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

Text.defaultProps = {
  value: '',
  tag: 'div',
  className: '',
  children: '',
  id: '',
};

export default Text;
