import React from 'react';

interface ButtonProps extends React.PropsWithChildren<HTMLButtonElement> {
  primary?: boolean;
}

const Button: React.FC<ButtonProps> = React.forwardRef(
  (props: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
    const { primary } = props;
    const htmlProps = props;

    if (!primary) {
      return (
        <button
          ref={ref}
          className="border border-black bg-gray-200 text-black m-4 px-3 py-2"
          {...htmlProps}
        >
          {props.children}
        </button>
      );
    }
    return (
      <button
        ref={ref}
        className="border border-black bg-blue-400 text-white font-bold m-4 px-3 py-2"
        {...htmlProps}
      >
        {props.children}
      </button>
    );
  },
);

export default Button;
