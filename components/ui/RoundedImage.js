export default function RoundedImage(props) {
  const { src, alt, width, height } = props;

  if (!src) {
    return (
      <img src="/images/user.svg" alt={alt} width={width} height={height} />
    );
  } else {
    return <img src={src} alt={alt} width={width} height={height} />;
  }
}
