import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import { Card, ListGroup, Button } from "react-bootstrap";
import { useMemo } from "react";
import styles from "@/styles/History.module.css";

// Import the removeHistory function
import { removeHistory } from "@/lib/userData"; // Update with correct import path

const History = () => {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  // Ensure we do not display "Nothing here" if searchHistory is null
  if (!searchHistory) return null;

  const parsedHistory = useMemo(() => {
    return searchHistory.map((h) => {
      const params = new URLSearchParams(h);
      return Object.fromEntries(params.entries());
    });
  }, [searchHistory]);

  const historyClicked = (e, index) => {
    e.preventDefault();
    router.push(`/artwork?${searchHistory[index]}`);
  };

  // Update to async removeHistoryClicked
  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation();

    // Use async function to update history atom
    const updatedHistory = await removeHistory(searchHistory[index]);
    setSearchHistory(updatedHistory);
  };

  return (
    <>
      {parsedHistory.length === 0 ? (
        <Card>
          <Card.Body>Nothing here! Try searching for some artwork.</Card.Body>
        </Card>
      ) : (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              onClick={(e) => historyClicked(e, index)}
              className={`d-flex justify-content-between align-items-center ${styles.historyListItem}`}
            >
              <div>
                {Object.keys(historyItem).map((key) => (
                  <div key={key}>
                    <strong>{key}:</strong> {historyItem[key]}
                  </div>
                ))}
              </div>
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default History;
