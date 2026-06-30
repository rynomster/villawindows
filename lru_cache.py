import threading

class Node:
    def __init__(self, key=None, value=None):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head
        self.lock = threading.Lock()

    def _add_node(self, node):
        """Always add the new node right after head."""
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node):
        """Remove an existing node from the linked list."""
        prev = node.prev
        nxt = node.next
        prev.next = nxt
        nxt.prev = prev

    def _move_to_head(self, node):
        """Move certain node in between to the head."""
        self._remove_node(node)
        self._add_node(node)

    def _pop_tail(self):
        """Pop the current tail node (Least Recently Used)."""
        res = self.tail.prev
        self._remove_node(res)
        return res

    def get(self, key):
        with self.lock:
            node = self.cache.get(key)
            if not node:
                return None
            self._move_to_head(node)
            return node.value

    def put(self, key, value):
        with self.lock:
            node = self.cache.get(key)
            if not node:
                new_node = Node(key, value)
                self.cache[key] = new_node
                self._add_node(new_node)
                if len(self.cache) > self.capacity:
                    tail = self._pop_tail()
                    del self.cache[tail.key]
            else:
                node.value = value
                self._move_to_head(node)

    def __len__(self):
        with self.lock:
            return len(self.cache)
