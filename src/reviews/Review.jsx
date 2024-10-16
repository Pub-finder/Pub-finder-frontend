
export default function Review({ review }) {
    const [showMore, setShowMore] = useState(false);

    return (
          <div key={review.id}>
              <div className="flex items-center gap-4 my-1">
                  <h2>{review.username}</h2>
              </div>
              <ReviewRating label="Rating" value={review.rating} />

              {showMore && (
                  {review.toilets && <ReviewRating label="Toilets" value={review.toilets} />}
                  {review.service && <ReviewRating label="Service" value={review.service} />}
                  {review.volume && (
                  <p color="blue-gray" className="font-medium text-blue-gray-500">
                      Volume: Pleseant
                  </p>
                  )}
                  {review.review && (
                  <p className="bg-gray-800 rounded-lg my-2 p-2">
                      {review.review}
                  </p>
                  )}
              )}

              <Button
                  variant="filled"
                  onClick={() => {
                      setShowMore(!showMore);
                  }}
                  className="text-sm px-2 py-1 rounded bg-gray-500 text-black"
              >
                  {showMore ?
                      "Show less" : "Show more"
                  }
              </Button>
          </div>
    );

}