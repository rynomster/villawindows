import unittest
from lru_cache import LRUCache

class TestLRUCache(unittest.TestCase):
    def test_basic_operations(self):
        cache = LRUCache(2)
        cache.put(1, 1)
        cache.put(2, 2)
        self.assertEqual(cache.get(1), 1)
        cache.put(3, 3)    # evicts key 2
        self.assertIsNone(cache.get(2))
        cache.put(4, 4)    # evicts key 1
        self.assertIsNone(cache.get(1))
        self.assertEqual(cache.get(3), 3)
        self.assertEqual(cache.get(4), 4)

    def test_update_existing_key(self):
        cache = LRUCache(2)
        cache.put(1, 1)
        cache.put(1, 10)
        self.assertEqual(cache.get(1), 10)
        self.assertEqual(len(cache), 1)

    def test_capacity_one(self):
        cache = LRUCache(1)
        cache.put(1, 1)
        cache.put(2, 2)
        self.assertIsNone(cache.get(1))
        self.assertEqual(cache.get(2), 2)

if __name__ == "__main__":
    unittest.main()
