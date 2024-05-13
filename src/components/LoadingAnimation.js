const LoadingAnimation = ({ center, reviewHeight }) => {
    return <>
        <div className={`${reviewHeight ? reviewHeight : ''}`}>
            <div className={center ? 'loading loading-center' : 'loading'}></div>
        </div>
    </>
}

export default LoadingAnimation